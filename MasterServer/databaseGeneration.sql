CREATE DATABASE IF NOT EXISTS moduleloader;

DROP TABLE IF EXISTS `application_authorized`;
CREATE TABLE IF NOT EXISTS `application_authorized` (
  `apiKey` varchar(170) NOT NULL,
  `appName` varchar(255) NOT NULL,
  `appDesc` varchar(255) NOT NULL,
  `dateCreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`apiKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `application_authorized`
--

INSERT INTO `application_authorized` (`apiKey`, `appName`, `appDesc`, `dateCreation`) VALUES
('123', 'Site A', 'Description site A', '2019-08-26 22:26:18'),
('456', 'Site B', 'Description site B', '2019-08-26 22:26:36');

-- --------------------------------------------------------

--
-- Structure de la table `application_modules`
--

DROP TABLE IF EXISTS `application_modules`;
CREATE TABLE IF NOT EXISTS `application_modules` (
  `apiKey` varchar(170) NOT NULL,
  `idModule` int(11) NOT NULL,
  `dateAjout` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`apiKey`,`idModule`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `application_modules`
--

INSERT INTO `application_modules` (`apiKey`, `idModule`, `dateAjout`) VALUES
('123', 1, '2019-08-26 22:29:26'),
('123', 2, '2019-08-26 22:29:26'),
('456', 1, '2019-08-26 22:29:34');

-- --------------------------------------------------------

--
-- Structure de la table `modules`
--

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameModule` varchar(255) NOT NULL,
  `libelleModule` varchar(255) NOT NULL,
  `version` varchar(10) NOT NULL,
  `devVersion` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `modules`
--

INSERT INTO `modules` (`id`, `nameModule`, `libelleModule`, `version`, `devVersion`) VALUES
(1, 'testA', 'Je suis le module A', '1.0.0', '1.0.0'),
(2, 'testB', 'Je suis le module B', '1.0.0', '1.0.0');
COMMIT;