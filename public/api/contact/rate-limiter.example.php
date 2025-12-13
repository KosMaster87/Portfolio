<?php

declare(strict_types=1);

// Defines the number of allowed requests per minute from a single IP.
define('RATE_LIMIT_PER_MINUTE', 20);

// Path to the rate limit data file.
define('RATE_LIMIT_DATA_FILE', __DIR__ . '/rate_limit_data.json');

/**
 * Checks the rate limit for a given IP address.
 *
 * This function has the sole responsibility of checking if the limit
 * has been exceeded and delegates the detailed logic to helpers.
 *
 * @param string $ip The IP address to check.
 * @return bool Returns `false` if the rate limit is exceeded, otherwise `true`.
 */
function checkRateLimit(string $ip): bool
{
  $requestTimestamps = getRequestTimestampsForIp($ip);
  $requestsInLastMinute = countRequestsSince(time() - 60, $requestTimestamps);

  return $requestsInLastMinute < RATE_LIMIT_PER_MINUTE;
}

/**
 * Retrieves the request timestamps for a given IP.
 *
 * Loads data from a JSON file for persistent storage.
 *
 * @internal This is a private helper function for checkRateLimit().
 * @param string $ip The IP address to look up.
 * @return int[] An array of UNIX timestamps.
 */
function getRequestTimestampsForIp(string $ip): array
{
  $allData = loadRateLimitData();
  
  if (!isset($allData[$ip])) {
    $allData[$ip] = [];
  }

  $allData[$ip][] = time();
  $allData = cleanupOldEntries($allData);
  saveRateLimitData($allData);

  return $allData[$ip];
}

/**
 * Counts requests that have occurred since a given timestamp.
 *
 * @internal This is a private helper function for checkRateLimit().
 * @param int $sinceTimestamp The UNIX timestamp to count from.
 * @param int[] $requestTimestamps A list of timestamps to filter.
 * @return int The number of requests that occurred after the given timestamp.
 */
function countRequestsSince(int $sinceTimestamp, array $requestTimestamps): int
{
  $filteredTimestamps = array_filter(
    $requestTimestamps,
    fn(int $t) => $t >= $sinceTimestamp
  );

  return count($filteredTimestamps);
}

/**
 * Loads rate limit data from the JSON file.
 *
 * @internal This is a private helper function.
 * @return array<string, int[]> Associative array with IP addresses as keys and timestamp arrays as values.
 */
function loadRateLimitData(): array
{
  if (!file_exists(RATE_LIMIT_DATA_FILE)) {
    return [];
  }

  $content = file_get_contents(RATE_LIMIT_DATA_FILE);
  if ($content === false) {
    return [];
  }

  $data = json_decode($content, true);
  return is_array($data) ? $data : [];
}

/**
 * Saves rate limit data to the JSON file.
 *
 * @internal This is a private helper function.
 * @param array<string, int[]> $data Associative array with IP addresses as keys and timestamp arrays as values.
 * @return void
 */
function saveRateLimitData(array $data): void
{
  $jsonContent = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents(RATE_LIMIT_DATA_FILE, $jsonContent, LOCK_EX);
}

/**
 * Removes entries older than 1 hour to keep the file size manageable.
 *
 * @internal This is a private helper function.
 * @param array<string, int[]> $data Associative array with IP addresses as keys and timestamp arrays as values.
 * @return array<string, int[]> Cleaned data array.
 */
function cleanupOldEntries(array $data): array
{
  $oneHourAgo = time() - 3600;
  
  foreach ($data as $ip => $timestamps) {
    $data[$ip] = array_filter(
      $timestamps,
      fn(int $t) => $t >= $oneHourAgo
    );
    
    if (empty($data[$ip])) {
      unset($data[$ip]);
    }
  }

  return $data;
}
