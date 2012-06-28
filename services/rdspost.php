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
$pdesc = $db->real_escape_string($_REQUEST['pdesc']);
$splan = $db->real_escape_string($_REQUEST['splan']);

$sql = "SELECT `pid`  FROM `taxplans` WHERE `otherID`='$otherID' AND `pname`='$pname' ";
ChromePhp::log($sql);
$rs= $db->query($sql);
$mes ="ducks";
$eid=$rs->fetch_row();
	//echo $eid[0];
if ($rs->num_rows>1){
	//delete the dups
	$sqld ="DELETE FROM `taxplans`WHERE `otherID`='$otherID' AND `pname`='$pname' ";
	ChromePhp::log($sqld);
	$db->query($sqld);
	$mes =" There were multiple recordswith that ID and plan name. I got rid of all of them except yours.";
}
if ($rs->num_rows>0){
	//update if exists	
	$sqld ="UPDATE `taxplans`SET `otherID`= '$otherID', `pname`='$pname' WHERE `otherID`='$otherID' AND `pname`='$pname' ";
	ChromePhp::log($sqld);
	$db->query($sqld);	
	$mes =' There was an earlier version with this plan name and ID. I replaced it';
}else{
	//insert if new
	$sqld ="INSERT INTO `taxplans`(`otherID`, `pname`, `description`, `splan`) VALUES('$otherID', '$pname', '$pdesc', '$splan') ";
	ChromePhp::log($sqld);
	$db->query($sqld);		
	$mes =' Your plan was saved under the ID:' .$otherID. ' and the planName:' . $pname ;
}
$techo= '{"items":[{"message": "' . $mes . '"}]}'; 
echo $techo;
ChromePhp::log($techo);
?>