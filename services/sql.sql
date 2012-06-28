CREATE TABLE IF NOT EXISTS `taxplans` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `otherID` varchar(40) NOT NULL,
  `pname` varchar(20) NOT NULL,
  `description` text,
  `splan` text,
  `tstamp` timestamp,
  `voteplus` int(6),
  `voteminus` int(6),
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1000 ;