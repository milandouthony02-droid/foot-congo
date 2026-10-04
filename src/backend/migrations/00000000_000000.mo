import AccessControl "mo:caffeineai-authorization/access-control";
import List "mo:core/List";

module {
  public type OldActor = {};

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    news : List.List<{
      id : Nat;
      title : Text;
      summary : Text;
      content : Text;
      image : Text;
      publishedAt : Int;
      category : Text;
    }>;
    matches : List.List<{
      id : Nat;
      competition : Text;
      homeTeam : Text;
      awayTeam : Text;
      homeScore : ?Nat;
      awayScore : ?Nat;
      status : { #upcoming; #live; #finished };
      kickoff : Int;
      scorers : [{ playerName : Text; teamName : Text; minute : Nat }];
      summary : Text;
      lineup : { home : [Text]; away : [Text] };
    }>;
    standings : List.List<{
      competition : Text;
      rows : [{
        position : Nat;
        teamName : Text;
        played : Nat;
        won : Nat;
        drawn : Nat;
        lost : Nat;
        points : Nat;
      }];
    }>;
    teams : List.List<{
      id : Nat;
      name : Text;
      city : Text;
      logo : Text;
      squad : [Text];
    }>;
    players : List.List<{
      id : Nat;
      name : Text;
      position : Text;
      teamName : Text;
      photo : Text;
      stats : { goals : Nat; assists : Nat; matches : Nat };
    }>;
    adSlots : List.List<{
      id : Text;
      placement : Text;
      enabled : Bool;
      imageUrl : Text;
      targetUrl : Text;
    }>;
  };

  public func migration(_ : OldActor) : NewActor {
    let news = List.empty<{
      id : Nat;
      title : Text;
      summary : Text;
      content : Text;
      image : Text;
      publishedAt : Int;
      category : Text;
    }>();
    news.add({
      id = 1;
      title = "TP Mazembe s'impose face à l'AS Vita Club dans le derby de Lubumbashi";
      summary = "Les Corbeaux ont dominé le choc au sommet de la LINAFOOT grâce à un doublé de leur attaquant vedette.";
      content = "Dans une ambiance électrique au stade TP Mazembe, les Corbeaux ont pris le dessus sur leurs rivaux de l'AS Vita Club sur le score de 2-1. Menés à la pause, les hommes de l'entraîneur ont renversé la rencontre en seconde période grâce à un doublé de leur buteur. Ce succès permet au TP Mazembe de consolider sa place en tête du classement de la LINAFOOT D1.";
      image = "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800";
      publishedAt = 1_760_000_000_000_000_000;
      category = "LINAFOOT";
    });
    news.add({
      id = 2;
      title = "DC Motema Pembe recrute un attaquant international";
      summary = "Les Immaculés renforcent leur secteur offensif avant la reprise du championnat.";
      content = "Le DC Motema Pembe a officialisé l'arrivée d'un nouvel attaquant international pour renforcer son attaque en vue de la deuxième partie de saison. Le joueur, âgé de 24 ans, s'est engagé pour deux saisons. La direction du club se dit confiante quant à l'apport immédiat de ce renfort dans la course au titre.";
      image = "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800";
      publishedAt = 1_759_900_000_000_000_000;
      category = "Transferts";
    });
    news.add({
      id = 3;
      title = "FC Saint-Éloi Lupopo enchaîne une troisième victoire consécutive";
      summary = "Les Cheminots confirment leur bonne forme du moment et remontent au classement.";
      content = "Le FC Saint-Éloi Lupopo poursuit sa série impressionnante avec une troisième victoire de rang. Les Cheminots, portés par leur public, ont maîtrisé leur rencontre de bout en bout. Cette dynamique positive leur permet de se rapprocher du podium de la LINAFOOT D1.";
      image = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800";
      publishedAt = 1_759_800_000_000_000_000;
      category = "LINAFOOT";
    });
    news.add({
      id = 4;
      title = "AS Maniema Union mise sur la formation des jeunes";
      summary = "Le club de Kindu lance un programme ambitieux pour détecter les talents locaux.";
      content = "L'AS Maniema Union a dévoilé un nouveau programme de formation destiné à détecter et accompagner les jeunes talents de la région. Le club souhaite bâtir une équipe compétitive sur le long terme en s'appuyant sur son centre de formation. Une initiative saluée par les observateurs du football congolais.";
      image = "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800";
      publishedAt = 1_759_700_000_000_000_000;
      category = "Formation";
    });
    news.add({
      id = 5;
      title = "CS Don Bosco prépare le derby face au TP Mazembe";
      summary = "Les Salésiens peaufinent leur stratégie avant le grand rendez-vous de Lubumbashi.";
      content = "Le CS Don Bosco met les bouchons doubles pour préparer le derby très attendu face au TP Mazembe. Le staff technique a insisté sur la rigueur défensive et les transitions rapides lors des dernières séances d'entraînement. Les supporters salésiens espèrent un exploit face au champion en titre.";
      image = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800";
      publishedAt = 1_759_600_000_000_000_000;
      category = "LINAFOOT";
    });
    news.add({
      id = 6;
      title = "La Coupe du Congo : le tirage des quarts de finale dévoilé";
      summary = "Les affiches des quarts de finale promettent des rencontres spectaculaires.";
      content = "La Fédération congolaise de football a procédé au tirage au sort des quarts de finale de la Coupe du Congo. Les huit équipes qualifiées s'affronteront lors de matchs à élimination directe. Plusieurs chocs entre clubs de première division sont au programme, promettant un spectacle de haut niveau.";
      image = "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800";
      publishedAt = 1_759_500_000_000_000_000;
      category = "Coupe du Congo";
    });
    news.add({
      id = 7;
      title = "Le championnat reprend ses droits après la trêve internationale";
      summary = "La LINAFOOT D1 retrouve les terrains ce week-end avec des affiches passionnantes.";
      content = "Après une pause consacrée aux rencontres internationales, la LINAFOOT D1 reprend ses droits ce week-end. Toutes les équipes sont prêtes à en découdre pour la suite de la saison. Les regards seront notamment tournés vers le sommet du classement où la lutte pour le titre fait rage.";
      image = "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800";
      publishedAt = 1_759_400_000_000_000_000;
      category = "LINAFOOT";
    });
    news.add({
      id = 8;
      title = "Les Léopards préparent les éliminatoires de la CAN";
      summary = "La sélection nationale entame un stage de préparation en vue des prochaines échéances.";
      content = "L'équipe nationale de la République démocratique du Congo a entamé un stage de préparation en vue des prochaines rencontres des éliminatoires de la Coupe d'Afrique des Nations. Le sélectionneur a convoqué un groupe élargi mêlant cadres expérimentés et jeunes talents. L'objectif est de décrocher la qualification pour le tournoi continental.";
      image = "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800";
      publishedAt = 1_759_300_000_000_000_000;
      category = "Léopards";
    });

    let matches = List.empty<{
      id : Nat;
      competition : Text;
      homeTeam : Text;
      awayTeam : Text;
      homeScore : ?Nat;
      awayScore : ?Nat;
      status : { #upcoming; #live; #finished };
      kickoff : Int;
      scorers : [{ playerName : Text; teamName : Text; minute : Nat }];
      summary : Text;
      lineup : { home : [Text]; away : [Text] };
    }>();
    matches.add({
      id = 1;
      competition = "LINAFOOT D1";
      homeTeam = "TP Mazembe";
      awayTeam = "AS Vita Club";
      homeScore = ?2;
      awayScore = ?1;
      status = #finished;
      kickoff = 1_759_000_000_000_000_000;
      scorers = [
        { playerName = "Glody Likonza"; teamName = "TP Mazembe"; minute = 34 },
        { playerName = "Jean Baleke"; teamName = "AS Vita Club"; minute = 58 },
        { playerName = "Cédric Bakambu"; teamName = "TP Mazembe"; minute = 79 },
      ];
      summary = "Le TP Mazembe remporte le derby de Lubumbashi 2-1 grâce à un but tardif de Cédric Bakambu.";
      lineup = {
        home = ["Sylvain Gbohouo", "Issama Mpeko", "Kevin Mondeko", "Merveille Bope", "Glody Likonza", "Cédric Bakambu"];
        away = ["Lionel Mpasi", "Marcel Tisserand", "Christian Luyindama", "Jean Baleke", "Meschack Elia", "Fiston Mayele"];
      };
    });
    matches.add({
      id = 2;
      competition = "LINAFOOT D1";
      homeTeam = "DC Motema Pembe";
      awayTeam = "FC Saint-Éloi Lupopo";
      homeScore = ?1;
      awayScore = ?1;
      status = #finished;
      kickoff = 1_759_100_000_000_000_000;
      scorers = [
        { playerName = "Junior Mbele"; teamName = "DC Motema Pembe"; minute = 22 },
        { playerName = "Patou Kabangu"; teamName = "FC Saint-Éloi Lupopo"; minute = 67 },
      ];
      summary = "Partage des points entre les Immaculés et les Cheminots dans un match équilibré.";
      lineup = {
        home = ["Hervé Lomboto", "Junior Mbele", "Blaise Mbemba", "Guy Mbenza", "Ndaye Mulamba", "Kazadi Kasengu"];
        away = ["Nathan Mabruki", "Patou Kabangu", "Mukendi Kabuya", "Tshibangu Kalala", "Mputu Mabi", "Lelo Mbele"];
      };
    });
    matches.add({
      id = 3;
      competition = "LINAFOOT D1";
      homeTeam = "AS Maniema Union";
      awayTeam = "CS Don Bosco";
      homeScore = ?0;
      awayScore = ?2;
      status = #finished;
      kickoff = 1_759_200_000_000_000_000;
      scorers = [
        { playerName = "Dieumerci Mbokani"; teamName = "CS Don Bosco"; minute = 15 },
        { playerName = "Trésor Mputu"; teamName = "CS Don Bosco"; minute = 71 },
      ];
      summary = "Le CS Don Bosco s'impose nettement sur la pelouse de l'AS Maniema Union.";
      lineup = {
        home = ["Bakala Landu", "Mukendi Tshibangu", "Kalonji Mutombo", "Ilunga Kabongo", "Mbuyi Kalonji", "Tshimanga Beya"];
        away = ["Parfait Mandanda", "Dieumerci Mbokani", "Trésor Mputu", "Merveille Bope", "Lema Mabidi", "Kabananga Kalonji"];
      };
    });
    matches.add({
      id = 4;
      competition = "LINAFOOT D1";
      homeTeam = "TP Mazembe";
      awayTeam = "DC Motema Pembe";
      homeScore = ?3;
      awayScore = ?0;
      status = #finished;
      kickoff = 1_759_300_000_000_000_000;
      scorers = [
        { playerName = "Cédric Bakambu"; teamName = "TP Mazembe"; minute = 12 },
        { playerName = "Glody Likonza"; teamName = "TP Mazembe"; minute = 45 },
        { playerName = "Jackson Muleka"; teamName = "TP Mazembe"; minute = 88 },
      ];
      summary = "Démonstration de force du TP Mazembe qui écrase le DC Motema Pembe 3-0.";
      lineup = {
        home = ["Sylvain Gbohouo", "Issama Mpeko", "Kevin Mondeko", "Glody Likonza", "Jackson Muleka", "Cédric Bakambu"];
        away = ["Hervé Lomboto", "Junior Mbele", "Blaise Mbemba", "Guy Mbenza", "Ndaye Mulamba", "Kazadi Kasengu"];
      };
    });
    matches.add({
      id = 5;
      competition = "Coupe du Congo";
      homeTeam = "AS Vita Club";
      awayTeam = "AS Maniema Union";
      homeScore = ?2;
      awayScore = ?0;
      status = #finished;
      kickoff = 1_759_400_000_000_000_000;
      scorers = [
        { playerName = "Fiston Mayele"; teamName = "AS Vita Club"; minute = 30 },
        { playerName = "Meschack Elia"; teamName = "AS Vita Club"; minute = 55 },
      ];
      summary = "L'AS Vita Club se qualifie pour les demi-finales de la Coupe du Congo.";
      lineup = {
        home = ["Lionel Mpasi", "Marcel Tisserand", "Christian Luyindama", "Fiston Mayele", "Meschack Elia", "Jean Baleke"];
        away = ["Bakala Landu", "Mukendi Tshibangu", "Kalonji Mutombo", "Ilunga Kabongo", "Mbuyi Kalonji", "Tshimanga Beya"];
      };
    });
    matches.add({
      id = 6;
      competition = "LINAFOOT D1";
      homeTeam = "FC Saint-Éloi Lupopo";
      awayTeam = "CS Don Bosco";
      homeScore = ?1;
      awayScore = ?0;
      status = #live;
      kickoff = 1_760_100_000_000_000_000;
      scorers = [
        { playerName = "Patou Kabangu"; teamName = "FC Saint-Éloi Lupopo"; minute = 41 },
      ];
      summary = "Les Cheminots mènent 1-0 à la mi-temps face au CS Don Bosco.";
      lineup = {
        home = ["Nathan Mabruki", "Patou Kabangu", "Mukendi Kabuya", "Tshibangu Kalala", "Mputu Mabi", "Lelo Mbele"];
        away = ["Parfait Mandanda", "Dieumerci Mbokani", "Trésor Mputu", "Merveille Bope", "Lema Mabidi", "Kabananga Kalonji"];
      };
    });
    matches.add({
      id = 7;
      competition = "LINAFOOT D1";
      homeTeam = "AS Vita Club";
      awayTeam = "DC Motema Pembe";
      homeScore = ?1;
      awayScore = ?1;
      status = #live;
      kickoff = 1_760_100_500_000_000_000;
      scorers = [
        { playerName = "Fiston Mayele"; teamName = "AS Vita Club"; minute = 18 },
        { playerName = "Junior Mbele"; teamName = "DC Motema Pembe"; minute = 52 },
      ];
      summary = "Match nul 1-1 en cours entre l'AS Vita Club et le DC Motema Pembe.";
      lineup = {
        home = ["Lionel Mpasi", "Marcel Tisserand", "Christian Luyindama", "Fiston Mayele", "Meschack Elia", "Jean Baleke"];
        away = ["Hervé Lomboto", "Junior Mbele", "Blaise Mbemba", "Guy Mbenza", "Ndaye Mulamba", "Kazadi Kasengu"];
      };
    });
    matches.add({
      id = 8;
      competition = "LINAFOOT D1";
      homeTeam = "TP Mazembe";
      awayTeam = "FC Saint-Éloi Lupopo";
      homeScore = null;
      awayScore = null;
      status = #upcoming;
      kickoff = 1_760_200_000_000_000_000;
      scorers = [];
      summary = "Choc au sommet en perspective entre le TP Mazembe et le FC Saint-Éloi Lupopo.";
      lineup = {
        home = ["Sylvain Gbohouo", "Issama Mpeko", "Kevin Mondeko", "Glody Likonza", "Jackson Muleka", "Cédric Bakambu"];
        away = ["Nathan Mabruki", "Patou Kabangu", "Mukendi Kabuya", "Tshibangu Kalala", "Mputu Mabi", "Lelo Mbele"];
      };
    });
    matches.add({
      id = 9;
      competition = "Coupe du Congo";
      homeTeam = "CS Don Bosco";
      awayTeam = "DC Motema Pembe";
      homeScore = null;
      awayScore = null;
      status = #upcoming;
      kickoff = 1_760_300_000_000_000_000;
      scorers = [];
      summary = "Quart de finale de la Coupe du Congo entre le CS Don Bosco et le DC Motema Pembe.";
      lineup = {
        home = ["Parfait Mandanda", "Dieumerci Mbokani", "Trésor Mputu", "Merveille Bope", "Lema Mabidi", "Kabananga Kalonji"];
        away = ["Hervé Lomboto", "Junior Mbele", "Blaise Mbemba", "Guy Mbenza", "Ndaye Mulamba", "Kazadi Kasengu"];
      };
    });
    matches.add({
      id = 10;
      competition = "LINAFOOT D1";
      homeTeam = "AS Maniema Union";
      awayTeam = "AS Vita Club";
      homeScore = null;
      awayScore = null;
      status = #upcoming;
      kickoff = 1_760_400_000_000_000_000;
      scorers = [];
      summary = "L'AS Maniema Union accueille l'AS Vita Club dans un match important pour le maintien.";
      lineup = {
        home = ["Bakala Landu", "Mukendi Tshibangu", "Kalonji Mutombo", "Ilunga Kabongo", "Mbuyi Kalonji", "Tshimanga Beya"];
        away = ["Lionel Mpasi", "Marcel Tisserand", "Christian Luyindama", "Fiston Mayele", "Meschack Elia", "Jean Baleke"];
      };
    });

    let standings = List.empty<{
      competition : Text;
      rows : [{
        position : Nat;
        teamName : Text;
        played : Nat;
        won : Nat;
        drawn : Nat;
        lost : Nat;
        points : Nat;
      }];
    }>();
    standings.add({
      competition = "LINAFOOT D1";
      rows = [
        { position = 1; teamName = "TP Mazembe"; played = 12; won = 9; drawn = 2; lost = 1; points = 29 },
        { position = 2; teamName = "AS Vita Club"; played = 12; won = 8; drawn = 2; lost = 2; points = 26 },
        { position = 3; teamName = "FC Saint-Éloi Lupopo"; played = 12; won = 7; drawn = 3; lost = 2; points = 24 },
        { position = 4; teamName = "CS Don Bosco"; played = 12; won = 6; drawn = 3; lost = 3; points = 21 },
        { position = 5; teamName = "DC Motema Pembe"; played = 12; won = 5; drawn = 4; lost = 3; points = 19 },
        { position = 6; teamName = "AS Maniema Union"; played = 12; won = 3; drawn = 4; lost = 5; points = 13 },
      ];
    });
    standings.add({
      competition = "Coupe du Congo";
      rows = [
        { position = 1; teamName = "AS Vita Club"; played = 4; won = 3; drawn = 1; lost = 0; points = 10 },
        { position = 2; teamName = "TP Mazembe"; played = 4; won = 3; drawn = 0; lost = 1; points = 9 },
        { position = 3; teamName = "CS Don Bosco"; played = 4; won = 2; drawn = 1; lost = 1; points = 7 },
        { position = 4; teamName = "FC Saint-Éloi Lupopo"; played = 4; won = 2; drawn = 0; lost = 2; points = 6 },
        { position = 5; teamName = "DC Motema Pembe"; played = 4; won = 1; drawn = 1; lost = 2; points = 4 },
        { position = 6; teamName = "AS Maniema Union"; played = 4; won = 0; drawn = 1; lost = 3; points = 1 },
      ];
    });

    let teams = List.empty<{
      id : Nat;
      name : Text;
      city : Text;
      logo : Text;
      squad : [Text];
    }>();
    teams.add({
      id = 1;
      name = "TP Mazembe";
      city = "Lubumbashi";
      logo = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200";
      squad = ["Sylvain Gbohouo", "Issama Mpeko", "Kevin Mondeko", "Glody Likonza", "Jackson Muleka", "Cédric Bakambu"];
    });
    teams.add({
      id = 2;
      name = "AS Vita Club";
      city = "Kinshasa";
      logo = "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=200";
      squad = ["Lionel Mpasi", "Marcel Tisserand", "Christian Luyindama", "Fiston Mayele", "Meschack Elia", "Jean Baleke"];
    });
    teams.add({
      id = 3;
      name = "DC Motema Pembe";
      city = "Kinshasa";
      logo = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200";
      squad = ["Hervé Lomboto", "Junior Mbele", "Blaise Mbemba", "Guy Mbenza", "Ndaye Mulamba", "Kazadi Kasengu"];
    });
    teams.add({
      id = 4;
      name = "FC Saint-Éloi Lupopo";
      city = "Lubumbashi";
      logo = "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200";
      squad = ["Nathan Mabruki", "Patou Kabangu", "Mukendi Kabuya", "Tshibangu Kalala", "Mputu Mabi", "Lelo Mbele"];
    });
    teams.add({
      id = 5;
      name = "AS Maniema Union";
      city = "Kindu";
      logo = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=200";
      squad = ["Bakala Landu", "Mukendi Tshibangu", "Kalonji Mutombo", "Ilunga Kabongo", "Mbuyi Kalonji", "Tshimanga Beya"];
    });
    teams.add({
      id = 6;
      name = "CS Don Bosco";
      city = "Lubumbashi";
      logo = "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=200";
      squad = ["Parfait Mandanda", "Dieumerci Mbokani", "Trésor Mputu", "Merveille Bope", "Lema Mabidi", "Kabananga Kalonji"];
    });

    let players = List.empty<{
      id : Nat;
      name : Text;
      position : Text;
      teamName : Text;
      photo : Text;
      stats : { goals : Nat; assists : Nat; matches : Nat };
    }>();
    players.add({
      id = 1;
      name = "Cédric Bakambu";
      position = "Attaquant";
      teamName = "TP Mazembe";
      photo = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200";
      stats = { goals = 12; assists = 4; matches = 14 };
    });
    players.add({
      id = 2;
      name = "Glody Likonza";
      position = "Milieu";
      teamName = "TP Mazembe";
      photo = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200";
      stats = { goals = 6; assists = 9; matches = 15 };
    });
    players.add({
      id = 3;
      name = "Sylvain Gbohouo";
      position = "Gardien";
      teamName = "TP Mazembe";
      photo = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200";
      stats = { goals = 0; assists = 0; matches = 16 };
    });
    players.add({
      id = 4;
      name = "Fiston Mayele";
      position = "Attaquant";
      teamName = "AS Vita Club";
      photo = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200";
      stats = { goals = 14; assists = 3; matches = 15 };
    });
    players.add({
      id = 5;
      name = "Meschack Elia";
      position = "Attaquant";
      teamName = "AS Vita Club";
      photo = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200";
      stats = { goals = 9; assists = 7; matches = 14 };
    });
    players.add({
      id = 6;
      name = "Christian Luyindama";
      position = "Défenseur";
      teamName = "AS Vita Club";
      photo = "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200";
      stats = { goals = 2; assists = 1; matches = 16 };
    });
    players.add({
      id = 7;
      name = "Junior Mbele";
      position = "Milieu";
      teamName = "DC Motema Pembe";
      photo = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200";
      stats = { goals = 5; assists = 6; matches = 15 };
    });
    players.add({
      id = 8;
      name = "Guy Mbenza";
      position = "Attaquant";
      teamName = "DC Motema Pembe";
      photo = "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200";
      stats = { goals = 8; assists = 2; matches = 13 };
    });
    players.add({
      id = 9;
      name = "Patou Kabangu";
      position = "Attaquant";
      teamName = "FC Saint-Éloi Lupopo";
      photo = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200";
      stats = { goals = 10; assists = 5; matches = 14 };
    });
    players.add({
      id = 10;
      name = "Mukendi Kabuya";
      position = "Défenseur";
      teamName = "FC Saint-Éloi Lupopo";
      photo = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200";
      stats = { goals = 1; assists = 2; matches = 15 };
    });
    players.add({
      id = 11;
      name = "Dieumerci Mbokani";
      position = "Attaquant";
      teamName = "CS Don Bosco";
      photo = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200";
      stats = { goals = 11; assists = 4; matches = 14 };
    });
    players.add({
      id = 12;
      name = "Trésor Mputu";
      position = "Milieu";
      teamName = "CS Don Bosco";
      photo = "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200";
      stats = { goals = 7; assists = 8; matches = 15 };
    });
    players.add({
      id = 13;
      name = "Ilunga Kabongo";
      position = "Milieu";
      teamName = "AS Maniema Union";
      photo = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200";
      stats = { goals = 4; assists = 3; matches = 14 };
    });
    players.add({
      id = 14;
      name = "Tshimanga Beya";
      position = "Gardien";
      teamName = "AS Maniema Union";
      photo = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200";
      stats = { goals = 0; assists = 0; matches = 15 };
    });

    let adSlots = List.empty<{
      id : Text;
      placement : Text;
      enabled : Bool;
      imageUrl : Text;
      targetUrl : Text;
    }>();
    adSlots.add({
      id = "home-banner";
      placement = "Accueil - bandeau supérieur";
      enabled = false;
      imageUrl = "";
      targetUrl = "";
    });
    adSlots.add({
      id = "matches-banner";
      placement = "Matchs - bandeau intermédiaire";
      enabled = false;
      imageUrl = "";
      targetUrl = "";
    });
    adSlots.add({
      id = "teams-banner";
      placement = "Équipes - bandeau inférieur";
      enabled = false;
      imageUrl = "";
      targetUrl = "";
    });

    {
      accessControlState = AccessControl.initState();
      news;
      matches;
      standings;
      teams;
      players;
      adSlots;
    };
  };
};
