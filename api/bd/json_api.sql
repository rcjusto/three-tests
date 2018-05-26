-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: json_api
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.17.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apikeys`
--

DROP TABLE IF EXISTS `apikeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apikeys` (
  `id` varchar(256) NOT NULL,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apikeys`
--

LOCK TABLES `apikeys` WRITE;
/*!40000 ALTER TABLE `apikeys` DISABLE KEYS */;
INSERT INTO `apikeys` VALUES ('123','testing user');
/*!40000 ALTER TABLE `apikeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `id` varchar(128) NOT NULL,
  `folder` varchar(128) NOT NULL,
  `name` varchar(512) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `body` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES ('07b3a8cf-7a06-44dc-8453-a5915662e6e7','pepe','','','{\"folder\":\"test\",\"name\":\"test\"}'),('1a8da258-de47-4c98-8486-c209c659ae33','wood-models','Buro 1',NULL,'{\"name\":\"Buro 1\",\"data\":[{\"name\":\"fondo\",\"children\":[{\"siz\":[116,96,10],\"pos\":[-22,-28,-11],\"type\":\"wall\"},{\"siz\":[10,96,200],\"pos\":[93,-28,-20],\"type\":\"wall\"},{\"siz\":[200,10,200],\"pos\":[-60,-38,-20],\"type\":\"floor\"}]},{\"name\":\"Top\",\"children\":[{\"pos\":[0,0,0],\"siz\":[92,1.5,7]},{\"pos\":[0,0,7],\"siz\":[92,1.5,7]},{\"pos\":[0,0,14],\"siz\":[92,1.5,7]},{\"pos\":[0,0,21],\"siz\":[92,1.5,7]}]},{\"name\":\"Patas\",\"children\":[{\"pos\":[1,-28,1],\"siz\":[1.5,28,2.5]},{\"pos\":[16,-28,1],\"siz\":[1.5,28,2.5]},{\"pos\":[16,-28,24.5],\"siz\":[1.5,28,2.5]},{\"pos\":[1,-28,24.5],\"siz\":[1.5,28,2.5]},{\"pos\":[1,-28,24.5],\"siz\":[1.5,28,2.5]}]},{\"name\":\"Travesannos\",\"children\":[{\"pos\":[1,-26,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[1,-2.5,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[16,-2.5,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[16,-26,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[2.5,-26,1],\"siz\":[13.5,2.5,1.5]},{\"pos\":[2.5,-2.5,1],\"siz\":[13.5,2.5,1.5]},{\"pos\":[2.5,-26,25.5],\"siz\":[13.5,2.5,1.5]}]},{\"name\":\"planchas\",\"children\":[{\"pos\":[1.75,-23.5,3.5],\"siz\":[0.75,23.5,21]},{\"pos\":[16,-23.5,3.5],\"siz\":[0.75,23.5,21]}]},{\"name\":\"Puertas\",\"children\":[{\"pos\":[2.6,-23.4,25.5],\"siz\":[13.25,23.3,0.75]}]},{\"name\":\"pc\",\"children\":[{\"pos\":[18.5,-26,1],\"siz\":[13.5,2.5,1.5]},{\"pos\":[18.5,-26,25.5],\"siz\":[13.5,2.5,1.5]},{\"pos\":[18.5,-26,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[32,-26,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[18.5,-28,1],\"siz\":[1.5,4.5,2.5]},{\"pos\":[18.5,-28,24.5],\"siz\":[1.5,4.5,2.5]},{\"pos\":[32,-28,1],\"siz\":[1.5,4.5,2.5]},{\"pos\":[32,-28,24.5],\"siz\":[1.5,4.5,2.5]},{\"name\":\"tapa\",\"pos\":[18.5,-24.25,2.5],\"siz\":[13.5,0.75,23]}]},{\"name\":\"Estante\",\"children\":[{\"pos\":[89.5,-28,24.5],\"siz\":[1.5,28,2.5]},{\"pos\":[89.5,-28,1],\"siz\":[1.5,28,2.5]},{\"pos\":[74.5,-28,1],\"siz\":[1.5,28,2.5]},{\"pos\":[74.5,-28,24.5],\"siz\":[1.5,28,2.5]},{\"pos\":[89.5,-26,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[74.5,-26,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[76,-26,1],\"siz\":[13.5,2.5,1.5]},{\"pos\":[76,-26,25.5],\"siz\":[13.5,2.5,1.5]},{\"pos\":[76,-14,1],\"siz\":[13.5,2.5,1.5]},{\"pos\":[76,-2.5,1],\"siz\":[13.5,2.5,1.5]},{\"pos\":[76,-14,25.5],\"siz\":[13.5,2.5,1.5]},{\"pos\":[74.5,-14,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[89.5,-14,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[76,-24.25,2.5],\"siz\":[13.5,0.75,23]},{\"pos\":[76,-12.25,2.5],\"siz\":[13.5,0.75,23]},{\"pos\":[74.5,-2.5,3.5],\"siz\":[1.5,2.5,21]},{\"pos\":[89.5,-2.5,3.5],\"siz\":[1.5,2.5,21]}]},{\"name\":\"Soporte\",\"children\":[{\"pos\":[17,-7,3.5],\"siz\":[74,7,0.75]}]}]}'),('5e42c514-31eb-4062-b947-d9a86a2b5288','pepe','test1',NULL,'{\"name\":\"test1\"}'),('a46713bb-04c5-4a4d-971f-99f113865671','wood-models','','','{\"id\":\"a46713bb-04c5-4a4d-971f-99f113865671\",\"name\":\"Mesa Comedor\",\"data\":[{\"id\":\"36089232-3001-4955-837f-7c5d0b76054c\",\"name\":\"Top\",\"children\":[{\"id\":\"0cf53781-46e2-44f0-9464-b5a68ca6452e\",\"name\":\"tabla 1\",\"pos\":[0,0,23],\"siz\":[84,3,7],\"hide\":false},{\"id\":\"5141722a-6303-4109-b2aa-d9c7e16df185\",\"name\":\"tabla 2\",\"pos\":[0,6,10],\"siz\":[84,1.5,7],\"hide\":false},{\"id\":\"2d17c0cf-1523-44c7-99e5-d9f6284d13b6\",\"name\":\"tabla 3\",\"pos\":[0,0,45],\"siz\":[84,1.5,7],\"hide\":false},{\"id\":\"e139ee5a-7e02-4e73-850e-f260cbf57ed2\",\"name\":\"tabla 4\",\"pos\":[0,-10,45],\"siz\":[84,1.5,7],\"hide\":false}]},{\"id\":\"688b8bc7-5578-4db2-9804-dd88db614223\",\"name\":\"New Folder\",\"children\":[{\"id\":\"283c3268-79e6-4da7-afe6-a0ad51b0a893\",\"name\":\"Top\",\"children\":[{\"id\":\"de9503eb-e889-4244-8404-ff4f05a33099\",\"name\":\"tabla 1\",\"pos\":[5,5,23],\"siz\":[84,3,7],\"hide\":false},{\"id\":\"9de18bc4-2cf4-42e2-ae85-b21d51bf3ada\",\"name\":\"tabla 2\",\"pos\":[0,16,10],\"siz\":[84,1.5,7],\"hide\":false},{\"id\":\"041066c0-0faa-4338-9c05-3f755cb65700\",\"name\":\"tabla 3\",\"pos\":[0,10,45],\"siz\":[84,1.5,7],\"hide\":false},{\"id\":\"81688d24-8168-439b-8e04-1a09a0be050c\",\"name\":\"tabla 4\",\"pos\":[0,20,45],\"siz\":[84,1.5,7],\"hide\":false}]}]}]}'),('e67f791b-33f7-446e-8009-cabf339a6d90','wood-models','','','{\"id\":\"e67f791b-33f7-446e-8009-cabf339a6d90\",\"name\":\"Testing 1\",\"data\":[{\"name\":\"fondo\",\"children\":[{\"siz\":[116,96,10],\"pos\":[-22,-28,-11],\"type\":\"wall\",\"id\":\"87aca319-8e92-4f4c-af95-ec3680f7161b\",\"name\":\"element 0\"},{\"siz\":[10,96,200],\"pos\":[93,-28,-20],\"type\":\"wall\",\"id\":\"13cfe48c-05d0-4b1a-b333-cb1c5bf202fa\",\"name\":\"element 1\"},{\"siz\":[200,10,200],\"pos\":[-60,-38,-20],\"type\":\"floor\",\"id\":\"82da437e-3bf4-4740-88be-2cb52a2a974b\",\"name\":\"element 2\"}],\"id\":\"1d6ff593-d10b-4f88-afc4-b154a54fff15\"},{\"name\":\"Top\",\"children\":[{\"pos\":[0,0,0],\"siz\":[92,1.5,7],\"id\":\"8294c939-9bb2-4361-bcc3-da94b8b81ed5\",\"name\":\"element 0\"},{\"pos\":[0,0,7],\"siz\":[92,1.5,7],\"id\":\"532f28c1-e490-43f6-aec6-f6706687d016\",\"name\":\"element 1\"},{\"pos\":[0,0,14],\"siz\":[92,1.5,7],\"id\":\"4567d147-aded-41f9-9024-27c503c0ab66\",\"name\":\"element 2\"},{\"pos\":[0,0,21],\"siz\":[92,1.5,7],\"id\":\"afb67cc4-7306-40ed-a905-9fa02d96a105\",\"name\":\"element 3\"}],\"id\":\"7399af07-7899-4def-bd99-083be68c79d1\"},{\"name\":\"pc\",\"children\":[{\"pos\":[18.5,-26,1],\"siz\":[13.5,2.5,1.5],\"id\":\"7fa65641-23f1-4817-8433-bf8deb15c366\",\"name\":\"element 0\"},{\"pos\":[18.5,-26,25.5],\"siz\":[13.5,2.5,1.5],\"id\":\"739ada13-60b3-4f64-baee-76f26f976b8f\",\"name\":\"element 1\"},{\"pos\":[18.5,-26,3.5],\"siz\":[1.5,2.5,21],\"id\":\"c1e4e239-63ea-4890-8c4c-65e7edc6e75a\",\"name\":\"element 2\"},{\"pos\":[32,-26,3.5],\"siz\":[1.5,2.5,21],\"id\":\"9c33b3c1-7992-48b7-846a-6b0ceae25b05\",\"name\":\"element 3\"},{\"pos\":[18.5,-28,1],\"siz\":[1.5,4.5,2.5],\"id\":\"af2f994b-f8dc-4c64-9447-82cee74ec190\",\"name\":\"element 4\"},{\"pos\":[18.5,-28,24.5],\"siz\":[1.5,4.5,2.5],\"id\":\"00d59a33-f028-4237-a39a-91079965619b\",\"name\":\"element 5\"},{\"pos\":[32,-28,1],\"siz\":[1.5,4.5,2.5],\"id\":\"192c646a-4a6a-4f7e-aca0-9039b2e27259\",\"name\":\"element 6\"},{\"pos\":[32,-28,24.5],\"siz\":[1.5,4.5,2.5],\"id\":\"1cfcc076-df9d-4d59-8a6e-98ac3e3c5640\",\"name\":\"element 7\"},{\"name\":\"tapa\",\"pos\":[18.5,-24.25,2.5],\"siz\":[13.5,0.75,23],\"id\":\"46ced1db-bff2-47ea-ab7a-a60b5ef5c667\"}],\"id\":\"64b4a797-23d3-45e9-b639-55d2bbef0d54\"},{\"name\":\"Estante\",\"children\":[{\"pos\":[89.5,-28,24.5],\"siz\":[1.5,28,2.5],\"id\":\"40a69b74-9a3c-4cde-94f4-cec1ed05b43b\",\"name\":\"element 0\"},{\"pos\":[89.5,-28,1],\"siz\":[1.5,28,2.5],\"id\":\"eb0c89db-980a-44af-9d12-1b825271b142\",\"name\":\"element 1\"},{\"pos\":[74.5,-28,1],\"siz\":[1.5,28,2.5],\"id\":\"c79f23bc-c638-49b0-9558-1396a8c89c6d\",\"name\":\"element 2\"},{\"pos\":[74.5,-28,24.5],\"siz\":[1.5,28,2.5],\"id\":\"08bad3cd-47e4-4913-914a-2d39e203b199\",\"name\":\"element 3\"},{\"pos\":[89.5,-26,3.5],\"siz\":[1.5,2.5,21],\"id\":\"75836a00-3f03-4359-acd9-dd4dba820b1b\",\"name\":\"element 4\"},{\"pos\":[74.5,-26,3.5],\"siz\":[1.5,2.5,21],\"id\":\"7af55d59-91ff-4b12-ade4-88259202f061\",\"name\":\"element 5\"},{\"pos\":[76,-26,1],\"siz\":[13.5,2.5,1.5],\"id\":\"40742698-d29d-4ca9-aee2-18cf07d97401\",\"name\":\"element 6\"},{\"pos\":[76,-26,25.5],\"siz\":[13.5,2.5,1.5],\"id\":\"866ff442-63bf-4c00-8e3a-704e4467b491\",\"name\":\"element 7\"},{\"pos\":[76,-14,1],\"siz\":[13.5,2.5,1.5],\"id\":\"1a159d1a-853e-445e-8722-90b792107b29\",\"name\":\"element 8\"},{\"pos\":[76,-2.5,1],\"siz\":[13.5,2.5,1.5],\"id\":\"9a957486-9737-4f8b-a13a-481d18f3f677\",\"name\":\"element 9\"},{\"pos\":[76,-14,25.5],\"siz\":[13.5,2.5,1.5],\"id\":\"5dc9af0b-5dbf-4e86-af89-f747a9099759\",\"name\":\"element 10\"},{\"pos\":[74.5,-14,3.5],\"siz\":[1.5,2.5,21],\"id\":\"388acee4-3cb3-4456-a55f-c2ed251c9a1b\",\"name\":\"element 11\"},{\"pos\":[89.5,-14,3.5],\"siz\":[1.5,2.5,21],\"id\":\"1c21f0f1-c970-4295-a93a-27d1da3ff1fb\",\"name\":\"element 12\"},{\"pos\":[76,-24.25,2.5],\"siz\":[13.5,0.75,23],\"id\":\"fe17337f-791c-4b29-b2d2-db2996e8034c\",\"name\":\"element 13\"},{\"pos\":[76,-12.25,2.5],\"siz\":[13.5,0.75,23],\"id\":\"43a7a3f9-d206-47cf-a68c-6cea7a54d5cb\",\"name\":\"element 14\"},{\"pos\":[74.5,-2.5,3.5],\"siz\":[1.5,2.5,21],\"id\":\"019e57ec-e18a-49b4-9cc8-165d0ceda020\",\"name\":\"element 15\"},{\"pos\":[89.5,-2.5,3.5],\"siz\":[1.5,2.5,21],\"id\":\"1678c2b1-e88e-4089-8dfe-d71a2d45b35d\",\"name\":\"element 16\"}],\"id\":\"3a6906f2-7a0a-4f41-aa15-fcb35b048d64\"},{\"name\":\"Soporte\",\"children\":[{\"pos\":[17,-7,3.5],\"siz\":[74,7,0.75],\"id\":\"61af9979-7e91-41e4-83d4-788ba204baa3\",\"name\":\"element 0\"}],\"id\":\"9c8878d1-f659-4698-b6dc-f573729f11c9\"},{\"id\":\"b9af9174-df06-4193-a4b5-80641b249ffa\",\"name\":\"Gavetas\",\"children\":[{\"name\":\"Patas\",\"children\":[{\"pos\":[1,-28,1],\"siz\":[1.5,28,2.5],\"id\":\"c7b3a23a-5ef6-474b-b530-c61153030b36\",\"name\":\"element 0\"},{\"pos\":[16,-28,1],\"siz\":[1.5,28,2.5],\"id\":\"1609388a-031d-4552-b820-ce3960e5e209\",\"name\":\"element 1\"},{\"pos\":[16,-28,24.5],\"siz\":[1.5,28,2.5],\"id\":\"03967754-ffb9-4639-9f18-64df2cd09ee0\",\"name\":\"element 2\"},{\"pos\":[1,-28,24.5],\"siz\":[1.5,28,2.5],\"id\":\"b40c89a8-a70d-43b2-8da7-7401f2dc5bbd\",\"name\":\"element 3\"},{\"pos\":[1,-28,24.5],\"siz\":[1.5,28,2.5],\"id\":\"d38c99b6-ec0e-4289-9b39-ce7c95042ef8\",\"name\":\"element 4\"}],\"id\":\"f5e7c664-19aa-4131-95e3-c427568dd998\"},{\"name\":\"Travesannos\",\"children\":[{\"pos\":[1,-26,3.5],\"siz\":[1.5,2.5,21],\"id\":\"347661a0-d966-4570-83cf-5d2449426c10\",\"name\":\"element 0\"},{\"pos\":[1,-2.5,3.5],\"siz\":[1.5,2.5,21],\"id\":\"7234f774-2d18-47c5-8fd5-7ef352d5d672\",\"name\":\"element 1\"},{\"pos\":[16,-2.5,3.5],\"siz\":[1.5,2.5,21],\"id\":\"cc633dcb-369b-4667-9f67-00275c50231a\",\"name\":\"element 2\"},{\"pos\":[16,-26,3.5],\"siz\":[1.5,2.5,21],\"id\":\"ddfaa458-ba9e-4ddb-b521-94bbad0748b0\",\"name\":\"element 3\"},{\"pos\":[2.5,-26,1],\"siz\":[13.5,2.5,1.5],\"id\":\"71b74e1f-c2cf-4d0e-a661-6bf719792be7\",\"name\":\"element 4\"},{\"pos\":[2.5,-2.5,1],\"siz\":[13.5,2.5,1.5],\"id\":\"d349ab06-b85b-4de4-9aca-8e0333f554bb\",\"name\":\"element 5\"},{\"pos\":[2.5,-26,25.5],\"siz\":[13.5,2.5,1.5],\"id\":\"9954806c-93a1-414b-8388-5ba653c176bf\",\"name\":\"element 6\"}],\"id\":\"70e73096-f5f8-4432-b3d0-c693982cfdd4\"},{\"name\":\"planchas\",\"children\":[{\"pos\":[1.75,-23.5,3.5],\"siz\":[0.75,23.5,21],\"id\":\"8c4ba0a1-9c75-4408-9747-fb1f8d11b57d\",\"name\":\"element 0\"},{\"pos\":[16,-23.5,3.5],\"siz\":[0.75,23.5,21],\"id\":\"1d652a6c-4e69-4907-a27c-adc667ab3b98\",\"name\":\"element 1\"}],\"id\":\"8520e877-c383-41a7-815e-e586e003a25c\"},{\"name\":\"Puertas\",\"children\":[{\"pos\":[2.6,-23.4,25.5],\"siz\":[13.25,23.3,0.75],\"id\":\"06a7472a-afa6-41c7-bc95-18c1d17aabc0\",\"name\":\"Puerta\"}],\"id\":\"dd1ae0d4-a6ff-4590-856a-17076da03429\"}]}]}');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-08 17:21:19
