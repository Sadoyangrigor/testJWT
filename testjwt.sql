-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 23 2021 г., 21:40
-- Версия сервера: 10.4.13-MariaDB
-- Версия PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testjwt`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Fighting'),
(2, 'Action-adventure'),
(3, 'First-person shooter'),
(4, 'another categoie 1'),
(7, 'another categorie 888'),
(8, 'another categorie 456'),
(9, 'another categorie 789'),
(10, 'another categorie 123');

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `creator_company` varchar(250) DEFAULT NULL,
  `legal_age` smallint(2) DEFAULT 18,
  `price` decimal(10,2) DEFAULT NULL,
  `create_data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `cat_id`, `name`, `description`, `creator_company`, `legal_age`, `price`, `create_data`) VALUES
(11, 1, 'Mortal Kombat 11', ' компьютерная игра в жанре файтинг, разработанная американской студией NetherRealm Studios под издательством WB Games для игровых платформ PlayStation 4, Xbox One, Nintendo Switch и Microsoft Windows. Mortal Kombat 11 является продолжением Mortal Kombat X и одиннадцатой по счёту игрой в основной серии Mortal Kombat. Анонс игрового трейлера впервые был представлен на The Game Awards 2018. Выход игры состоялся 23 апреля 2019 года. В конце января 2019 года было объявлено, что дата выхода физических копий игры на Nintendo Switch в Европе была перенесена на 10 мая 2019 года', 'WB Games', 18, '25000.00', '2021-05-23 03:06:29'),
(12, 2, 'Cyberpunk 2077', 'компьютерная игра в жанре action/RPG, разработанная и изданная польской студией CD Projekt. Действие игры происходит в 2077 году в Найт-Сити, вымышленном североамериканском городе из вселенной Cyberpunk.Перейти к разделу «#Сюжет» Игрок управляет настраиваемым протагонистом по имени Ви, который работает наёмником и владеет навыками взлома и боя', 'Rockstar Games', 18, '30000.25', '2021-05-23 03:08:06'),
(13, 3, 'Grand Theft Auto V', ' мультиплатформенная компьютерная игра в жанре action-adventure с открытым миром, разработанная компанией Rockstar North и изданная компанией Rockstar Games. Изначально игра была выпущена для игровых консолей PlayStation 3 и Xbox 360 в 2013 году, в 2014 году переиздана для PlayStation 4 и Xbox One, а в 2015 году — для персональных компьютеров под управлением Windows. Является пятнадцатой по счёту игрой серии Grand Theft Auto и следующей крупной игрой после Grand Theft Auto IV, выпущенной в 2008 году[5]. В России и СНГ издателем Grand Theft Auto V выступает компания 1С-СофтКлаб', 'Bandai Namco Entertainment', 21, '15000.00', '2021-05-23 03:08:54');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `games_id` int(11) DEFAULT NULL,
  `create_data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `user_name`, `games_id`, `create_data`) VALUES
(1, 'Client 1', 12, '2021-05-23 04:32:49'),
(2, 'Client 2', 13, '2021-05-23 04:33:01'),
(3, 'Client 2', 11, '2021-05-23 04:33:05'),
(4, 'Client 2', 11, '2021-05-23 23:40:08');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `games_id` (`games_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`games_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
