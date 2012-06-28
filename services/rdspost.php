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
//$otherID = 'fghy';
//$pname = 'dog1';
//http://10.0.1.12/~levelthe/services/rdspost.php?otherID=ggggg&pname=dog1&pdesc=This+plan...&splan=%7B%22planName%22%3A%22dog1%22%2C%22deductions%22%3A%5B10306%2C10306%2C10938%2C13164%2C16896%2C65871%2C70000%2C120000%2C800000%2C8000000%2C49390000%5D%2C%22deductionStd%22%3A17400%2C%22useStdDed%22%3A0%2C%22dedMixPercStd%22%3A0%2C%22taxCGasOrd%22%3A0%2C%22capGains%22%3A0.15%2C%22brackets%22%3A%5B8700%2C35350%2C85650%2C178650%2C388350%5D%2C%22marginal%22%3A%5B0.1%2C0.15%2C0.25%2C0.3%2C0.33%2C0.35%5D%2C%22descr%22%3A%7B%22intro%22%3A%22This+plan...%22%2C%22brackets%22%3A%22The+brackets+and+rates+are+set+so+that...%22%2C%22overall%22%3A%22Comparing+this+plan+to+Obama's%2C+overall+taxes+for+each+income...%22%2C%22unearned%22%3A%22Capital+Gains+and+preferred+dividends+are+treated+....%22%2C%22deductions%22%3A%22Deductions+by+income+group...%22%2C%22conclude%22%3A%22Deductions+by+income+group...%22%7D%7D

//check for dulicates
$sql = "SELECT `pid`  FROM `taxplans` WHERE `otherID`='$otherID' AND `pname`='$pname' ";
ChromePhp::log($sql);
$rs= $db->query($sql);
$mes ="ducks";
$eid=$rs->fetch_row();
	//echo $eid[0];
if ($rs->num_rows>1){
	//delete the dups
	$sqld ="DELETE FROM `taxplans`WHERE `pid` != $eid[0]";
	ChromePhp::log($sqld);
	$db->query($sqld);
	$mes =" There were multiple recordswith that ID and plan name. I got rid of all of them except yours.";
}
if ($rs->num_rows>0){
	//update if exists	
	$sqld ="UPDATE `taxplans`SET `otherID`= '$otherID', `pname`='$pname' WHERE `pid` = $eid[0]";
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