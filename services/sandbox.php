<?php
header('Content-Type: text/plain; charset=utf-8');

// If necessary, reference the sdk.class.php file. Otherwise, comment-out or delete the reference.
// This assumes the sdk.class.php file is in the same directory as this file
require_once dirname(__FILE__) . '/sdk.class.php';
 
// Instantiate the class
$dynamodb = new AmazonDynamoDB();
     
$table_name = 'ExampleTable';
     
####################################################################
# Create a new DynamoDB table
     
$response = $dynamodb->create_table(array(
    'TableName' => $table_name,
    'KeySchema' => array(
        'HashKeyElement' => array(
            'AttributeName' => 'Id',
            'AttributeType' => AmazonDynamoDB::TYPE_NUMBER
        ),
        'RangeKeyElement' => array(
            'AttributeName' => 'Date',
            'AttributeType' => AmazonDynamoDB::TYPE_NUMBER
        )
    ),
    'ProvisionedThroughput' => array(
        'ReadCapacityUnits'  => 5,
        'WriteCapacityUnits' => 5
    )
));
     
// Check for success...
if ($response->isOK())
{
    echo '# Kicked off the creation of the DynamoDB table...' . PHP_EOL;
}
else
{
    print_r($response);
}
     
####################################################################
# Sleep and poll until the table has been created
     
$count = 0;
do {
    sleep(1);
    $count++;
     
    $response = $dynamodb->describe_table(array(
        'TableName' => $table_name
    ));
}
while ((string) $response->body->Table->TableStatus !== 'ACTIVE');
     
echo "The table \"${table_name}\" has been created (slept ${count} seconds)." . PHP_EOL; 
     
####################################################################
# Collect all table names in the account
     
echo PHP_EOL . PHP_EOL;
echo '# Collecting a complete list of tables in the account...' . PHP_EOL;
     
$response = $dynamodb->list_tables();
var_dump($response->body->TableNames()->map_string());     
       
####################################################################
# Updating the table
     
echo PHP_EOL . PHP_EOL;
echo "# Updating the \"${table_name}\" table..." . PHP_EOL;
     
$dynamodb->update_table(array(
    'TableName' => $table_name,
    'ProvisionedThroughput'  => array(
        'ReadCapacityUnits'  => 10,
        'WriteCapacityUnits' => 5
    )
));
     
$table_status = $dynamodb->describe_table(array(
    'TableName' => $table_name
));
     
// Check for success...
if ($table_status->isOK())
{
    print_r($table_status->body->Table->ProvisionedThroughput->to_array()->getArrayCopy());
}
else
{
    print_r($table_status);
} 
     
####################################################################
# Sleep and poll until the table has been updated.
     
$count = 0;
do {
    sleep(5);
    $count += 5;
     
    $response = $dynamodb->describe_table(array(
        'TableName' => $table_name
    ));
}
while ((string) $response->body->Table->TableStatus !== 'ACTIVE');
     
echo "The table \"${table_name}\" has been updated (slept ${count} seconds)." . PHP_EOL;
     
     
####################################################################
# Deleting the table
 /* The following demonstrates how to delete the table, but is commented out so you can see the data
 * until you're ready to delete it.

echo PHP_EOL . PHP_EOL;
echo "# Deleting the \"${table_name}\" table..." . PHP_EOL;
     
$response = $dynamodb->delete_table(array(
    'TableName' => $table_name
));
     
// Check for success...
if ($response->isOK())
{
    echo 'The table is in the process of deleting...' . PHP_EOL;
}
else
{
    print_r($response);
}
          
####################################################################
# Sleep and poll until the table has been deleted.
     
$count = 0;
do {
    sleep(1);
    $count++;
     
    $response = $dynamodb->describe_table(array(
        'TableName' => $table_name
    ));
}
while ((integer) $response->status !== 400);
     
echo "The table \"${table_name}\" has been deleted (slept ${count} seconds)." . PHP_EOL;
*/
?>