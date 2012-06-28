<?php
include_once('tm/rdsinfo.php');
include('tm/ChromePhp.php');
$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
ChromePhp::log($db->host_info . "\n");

$pid = $_REQUEST['pid'];
$votefield = $_REQUEST['votefield'];
//insert if new
$sqld ="UPDATE `taxplans`SET `$votefield`= `$votefield` +1  WHERE `pid` = $pid";
ChromePhp::log($sqld);
$db->query($sqld);		
$mes =' Your plan was saved under the ID:' .$pid;

$techo= '{"items":[{"message": "' . $mes . '"}]}'; 
echo $techo;
ChromePhp::log($techo);
?>