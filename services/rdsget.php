<?php
include_once('tm/rdsinfo.php');
include('tm/ChromePhp.php');


$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
ChromePhp::log($db->host_info . "\n");
$pid = $db->real_escape_string($_REQUEST['pid']);

$sql ="select pid, otherID, pname, splan, description, tstamp, voteplus, voteminus  from `taxplans`WHERE `pid`= '$pid' ";
$rs = $db->query($sql);
//$allr = [];
while ($row = $rs->fetch_assoc()){
	ChromePhp::log($row);
	$allr[] = $row;
}
//$allrs = json_encode($rs->fech_all());
ChromePhp::log($allr);
$allrs = "ducks";
$jallr = json_encode($allr);
ChromePhp::log($jallr);

echo '{"items": ' . $jallr . '}';
$mes= "heres a well formed json";
//echo '{"items":[{"message": "' . $mes . '"}]}'; 
?>