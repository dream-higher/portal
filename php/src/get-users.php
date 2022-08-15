<?
require __DIR__ . '/vendor/autoload.php';

// if (php_sapi_name() != 'cli') {
//   throw new Exception('This application must be run on the command line.');
// }

use Google\Client;
use Google\Service\Directory;

/**
 * Returns an authorized API client.
 * @return Client the authorized client object
 */
function getClient()
{
  $client = new Client();
  $client->setApplicationName('G Suite Directory API PHP Quickstart');
  $client->setScopes('https://www.googleapis.com/auth/admin.directory.user.readonly');
  $client->setAuthConfig('credentials.json');
  $client->setAccessType('offline');
  $client->setPrompt('select_account consent');

  // Load previously authorized token from a file, if it exists.
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  $tokenPath = 'token.json';
  if (file_exists($tokenPath)) {
    $accessToken = json_decode(file_get_contents($tokenPath), true);
    $client->setAccessToken($accessToken);
  }

  // If there is no previous token or it's expired.
  if ($client->isAccessTokenExpired()) {
    // Refresh the token if possible, else fetch a new one.
    if ($client->getRefreshToken()) {
      $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    } else {
      // Request authorization from the user.
      $authUrl = $client->createAuthUrl();
      printf("Open the following link in your browser:\n%s\n", $authUrl);
      print 'Enter verification code: ';
      $authCode = trim(fgets(STDIN));

      // Exchange authorization code for an access token.
      $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
      $client->setAccessToken($accessToken);

      // Check to see if there was an error.
      if (array_key_exists('error', $accessToken)) {
        throw new Exception(join(', ', $accessToken));
      }
    }
    // Save the token to a file.
    if (!file_exists(dirname($tokenPath))) {
      mkdir(dirname($tokenPath), 0700, true);
    }
    file_put_contents($tokenPath, json_encode($client->getAccessToken()));
  }
  return $client;
}


// Get the API client and construct the service object.
$client = getClient();
$service = new Directory($client);

// Print the first 10 users in the domain.
try {

  $optParams = array(
    'customer' => 'my_customer',
    'maxResults' => 10,
    'orderBy' => 'email',
  );
  $results = $service->users->listUsers($optParams);

  if (count($results->getUsers()) == 0) {
    print "No users found.\n";
  } else {
    // print "Users:\n";
    // foreach ($results->getUsers() as $user) {
    //   printf(
    //     "%s (%s)\n",
    //     $user->getPrimaryEmail(),
    //     $user->getName()->getFullName()
    //   );
    // }
    print json_encode($results->getUsers());
    // var_dump($results->getUsers());
  }
} catch (Exception $e) {
  // TODO(developer) - handle error appropriately
  echo 'Message: ' . $e->getMessage();
}
