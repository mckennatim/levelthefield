<?php
include_once('tm/rdsinfo.php');
include('tm/ChromePhp.php');
$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
ChromePhp::log($db->host_info . "\n");

$otherID = $db->real_escape_string($_REQUEST['otherID']);
$pname = $db->real_escape_string($_REQUEST['pname']);


	$sqld ="DELETE FROM `taxplans`WHERE `otherID` = '$otherID' AND `pname`= '$pname' ";
	ChromePhp::log($sqld);
	$db->query($sqld);
	$mes =' I got rid of all shared records with  ID:' .$otherID. ' and the planName:' . $pname ;

$techo= '{"items":[{"message": "' . $mes . '"}]}'; 
echo $techo;
ChromePhp::log($techo);
?>