<?php
// If necessary, reference the sdk.class.php file.
require_once dirname(__FILE__) . '/sdk.class.php';

// Instantiate the class
$dynamodb = new AmazonDynamoDB();
     
$table_name = 'ExampleTable2';
$current_time = '1326864974';
       
####################################################################
# Create a new DynamoDB table
     
$response = $dynamodb->create_table(array(
    'TableName' => $table_name,
    'KeySchema' => array(
        'HashKeyElement' => array(
            'AttributeName' => 'id',
            'AttributeType' => AmazonDynamoDB::TYPE_NUMBER
        ),
        'RangeKeyElement' => array(
            'AttributeName' => 'date',
            'AttributeType' => AmazonDynamoDB::TYPE_NUMBER
        )
    ),
    'ProvisionedThroughput' => array(
        'ReadCapacityUnits' => 8,
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
# Adding data to the table
     
echo PHP_EOL . PHP_EOL;
echo "# Adding data to the table..." . PHP_EOL;
     
// Set up batch requests
$queue = new CFBatchRequest();
$queue->use_credentials($dynamodb->credentials);
     
// Add items to the batch
$dynamodb->batch($queue)->put_item(array(
    'TableName' => $table_name,
    'Item' => array(
        'id' => array( AmazonDynamoDB::TYPE_NUMBER => '1' ), // Primary (Hash) Key
        'date' => array( AmazonDynamoDB::TYPE_NUMBER => $current_time ), // Range Key
        'val1' => array( AmazonDynamoDB::TYPE_STRING => 'value1' ),
        'val2' => array( AmazonDynamoDB::TYPE_STRING => 'value2' ),
        'val3' => array( AmazonDynamoDB::TYPE_STRING => 'value3' )
    )
));
     
$dynamodb->batch($queue)->put_item(array(
    'TableName' => $table_name,
    'Item' => array(
        'id' => array( AmazonDynamoDB::TYPE_NUMBER => '2' ), // Primary (Hash) Key
        'date' => array( AmazonDynamoDB::TYPE_NUMBER => $current_time ), // Range Key
        'val1' => array( AmazonDynamoDB::TYPE_STRING => 'value1' ),
        'val2' => array( AmazonDynamoDB::TYPE_STRING => 'value2' ),
        'val3' => array( AmazonDynamoDB::TYPE_STRING => 'value3' )
    )
));
     
$dynamodb->batch($queue)->put_item(array(
    'TableName' => $table_name,
    'Item' => array(
        'id' => array( AmazonDynamoDB::TYPE_NUMBER => '3' ), // Primary (Hash) Key
        'date' => array( AmazonDynamoDB::TYPE_NUMBER => $current_time ), // Range Key
        'val1' => array( AmazonDynamoDB::TYPE_STRING => 'value1' ),
        'val2' => array( AmazonDynamoDB::TYPE_STRING => 'value2' ),
        'val3' => array( AmazonDynamoDB::TYPE_STRING => 'value3' )
    )
));
     
// Execute the batch of requests in parallel
$responses = $dynamodb->batch($queue)->send();
     
// Check for success...
if ($responses->areOK())
{
    echo "The data has been added to the table." . PHP_EOL;
}
    else
{
    print_r($responses);
}
       
####################################################################
# Getting an item
     
echo PHP_EOL . PHP_EOL;
echo "# Getting an item from the table..." . PHP_EOL;
     
// Get an item
$response = $dynamodb->get_item(array(
    'TableName' => $table_name,
    'Key' => array(
        'HashKeyElement' => array( // "id" column
        AmazonDynamoDB::TYPE_NUMBER => '1'
        ),
        'RangeKeyElement' => array( // "date" column
        AmazonDynamoDB::TYPE_NUMBER => $current_time
        )
    ),
    'AttributesToGet' => 'val3'
));
     
// Check for success...
if ($response->isOK())
{
    print_r($response);
}
     
####################################################################
# Updating an item
     
echo PHP_EOL . PHP_EOL;
echo "# Updating an item from the table..." . PHP_EOL;
     
// Updating an item
$response = $dynamodb->update_item(array(
    'TableName' => $table_name,
    'Key' => array(
        'HashKeyElement' => array( // "id" column
        AmazonDynamoDB::TYPE_NUMBER => '1'
        ),
        'RangeKeyElement' => array( // "date" column
        AmazonDynamoDB::TYPE_NUMBER => $current_time
        )
    ),
    'AttributeUpdates' => array(
        'val1' => array(
            'Action' => AmazonDynamoDB::ACTION_PUT,
            'Value' => array(AmazonDynamoDB::TYPE_STRING => 'updated-value1')
        ),
        'val22' => array(
            'Action' => AmazonDynamoDB::ACTION_DELETE
        )
    ),
    'Expected' => array(
        'val1' => array(
            'Value' => array( AmazonDynamoDB::TYPE_STRING => 'value1' )
        )
    )
));
     
// Check for success...
if ($response->isOK())
{
    echo 'Updated the item...' . PHP_EOL;
}
else
{
    print_r($response);
}
       
####################################################################
# Deleting an item
     
echo PHP_EOL . PHP_EOL;
echo "# Deleting an item from the table..." . PHP_EOL;
     
// Deleting an item
$response = $dynamodb->delete_item(array(
    'TableName' => $table_name,
    'Key' => array(
        'HashKeyElement' => array( // "id" column
            AmazonDynamoDB::TYPE_NUMBER => '1'
        ),
        'RangeKeyElement' => array( // "date" column
            AmazonDynamoDB::TYPE_NUMBER => $current_time
        )
    )
));
     
// Check for success...
if ($response->isOK())
{
    echo 'Deleting the item...' . PHP_EOL;
}
else
{
    print_r($response);
}
     
     
####################################################################
# Deleting the table - COMMENTED OUT
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