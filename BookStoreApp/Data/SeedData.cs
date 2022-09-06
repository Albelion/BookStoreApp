using Microsoft.EntityFrameworkCore;
using BookStoreApp.Data.Models;

namespace BookStoreApp.Data{
    public static class SeedData{
        public static void EnsureSeed(IApplicationBuilder app){
            BookStoreDbContext context = app.ApplicationServices.CreateScope()
            .ServiceProvider.GetRequiredService<BookStoreDbContext>();
            if(context.Database.GetPendingMigrations().Any()){
                context.Database.Migrate();
            }
                if(!context.Autors.Any()&& !context.Books.Any()&&!context.Ratings.Any()){
                        // Create autors
                        Autor autor1 = new(){Name="Джоан Роулинг"};
                        Autor autor2 = new(){Name="Стивен Кинг"};
                        Autor autor3 = new(){Name="Маргарет Митчелл"};
                        Autor autor4 = new(){Name="Артур Конан Дойл"};
                        Autor autor5 = new(){Name="Нора Сакатович"};
                        Autor autor6 = new(){Name="Кэтрин Стокетт"};
                        Autor autor7 = new(){Name="Джон Р.Р. Толкин"};
                        Autor autor8 = new(){Name="Александр Дюма"};
                        Autor autor9 = new(){Name="Джордж Мартин"};
                        // Save autors in ctx
                        context.Autors.AddRange(autor1, autor2, autor3, autor4,autor5, autor6, autor7, autor8, autor9);

                        // Create ratings
                        Rating rating1 = new() { Value=2.5};
                        Rating rating2 = new() { Value=3.3};
                        Rating rating3 = new() { Value=4.7};
                        Rating rating4 = new() { Value=4.8};
                        Rating rating5 = new() { Value=4.8};
                        Rating rating6 = new() { Value=4.7};
                        Rating rating7 = new() { Value=4.8};
                        Rating rating8 = new() { Value=4.8};
                        Rating rating9 = new() { Value=4.7};
                        Rating rating10 = new() { Value=4.6};
                        // Save ratings in ctx
                        context.Ratings.AddRange(rating1, rating2, rating3, rating4, rating5, rating6, rating7, rating8, rating9, rating10);

                        // Create Books with autors and ratings
                        context.Books.AddRange(
                    new Book{
                            Name = "Гарри Поттер и узник Азкабана",
                            Genre="фантастика",
                            PageNumber = 1245,
                            PublishYear = 2019,
                            ImageName = "Dzhoan_Rouling__Garri_Potter_i_uznik_Azkabana.jpeg",
                            Description = "Специальное издание для учеников и выпускников «Гриффиндора» к 20-летию первой публикации книги «Гарри Поттер и узник Азкабана",
                            Price = 300,
                            Ratings = {rating1},
                            Autors = {autor1}
                    },
                    new Book{
                            Name = "Зеленая миля",
                            Genre="фантастика",
                            PageNumber = 1103,
                            PublishYear = 2014,
                            ImageName = "Stiven_King__Zeljonaya_milya.jpeg",
                            Price = 450,
                            Description = "Стивен Кинг приглашает читателей в жуткий мир тюремного блока смертников, откуда уходят, чтобы не вернуться, приоткрывает дверь",
                            Ratings = {rating2},
                            Autors = {autor2}
                    },
                    new Book{
                            Name = "Унесенные ветром",
                            Genre="фантастика",
                            PageNumber = 832,
                            PublishYear = 2020,
                            ImageName = "Margaret_Mitchell__Unesennye_vetrom_komplekt_iz_2h_knig.jpeg",
                            Price = 220,
                            Description = "«Унесенные ветром» — история красавицы южанки, женщины с твердым характером, которая борется за личное счастье и благополучие, пока привычный мир вокруг гибнет. Беззаботную юность Скарлетт О'Хары унесли могучие ветры Гражданской войны. В один миг девушке пришлось повзрослеть: шум балов сменился грохотом канонад, мать умерла, отец сошел с ума, родное поместье опустело. Однако Скарлетт, капризную и своенравную, но, вместе с тем, сильную и отчаянную, не сломить ни любовным неудачам, ни сложностям жизни, ни грузу ответственности за близких. Ее пленительное обаяние и невероятная целеустремленность помогут пережить все испытания и обрести веру в себя. Роман о том, что любовь к жизни бывает важнее любви; о том, что заставляет нас жить — что бы ни творилось вокруг.",
                            Ratings = {rating3},
                            Autors = {autor3}
                    },
                    new Book{
                            Name = "Шерлок Холмс. Все повести и рассказы о сыщике N1",
                            Genre="детектив",
                            PageNumber = 1502,
                            PublishYear = 2019,
                            ImageName = "Artur_Konan_Dojl__Sherlok_Holms._Vse_povesti_i_rasskazy_o_syschike_No_1_sbornik.jpeg",
                            Price = 235,
                            Description = "Шерлок Холмс – литературный персонаж, созданный талан-том английского писателя Артура Конан Дойла (1859–1930). Его произведения, посвященн...",
                            Ratings = {rating4},
                            Autors = {autor4}
                    },
                    new Book{
                            Name = "Свита короля",
                            Genre="приключения",
                            PageNumber = 241,
                            PublishYear = 2021,
                            ImageName = "Nora_Sakavich__Svita_korolya.jpeg",
                            Price = 632,
                            Description = "Время на исходе. Оказавшись в Университете Пальметто, Нил Джостен знал, что не доживет до конца года, но теперь, когда смерть не за горами, он",
                            Ratings = {rating5},
                            Autors = {autor5}
                    },
                    new Book{
                            Name = "Прислуга",
                            Genre="роман",
                            PageNumber = 352,
                            PublishYear = 2016,
                            ImageName = "Ketrin_Stokett__Prisluga.jpeg",
                            Price = 952,
                            Description = "Американский Юг, на дворе 1960-е годы. Скитер только-только закончила университет и возвращается домой, в сонный городок Джексон, где никогда ничего не происходит. Она мечтает стать писательницей, вырваться в большой мир. Но приличной девушке с Юга не пристало тешиться столь глупыми иллюзиями, приличной девушке следует выйти замуж и хлопотать по дому. Мудрая Эйбилин на тридцать лет старше Скитер, она прислуживает в домах белых всю свою жизнь, вынянчила семнадцать детей и давно уже ничего не ждет от жизни, ибо сердце ее разбито после смерти единственного сына. Минни - самая лучшая стряпуха во всем Джексоне, а еще она самая дерзкая служанка в городе. И острый язык не раз уже сослужил ей плохую службу. На одном месте Минни никогда подолгу не задерживается. Но с Минни лучше не связываться даже самым высокомерным белым дамочкам. Двух черных служанок и белую неопытную девушку объединяет одно - обостренное чувство справедливости и желание хоть как-то изменить порядок вещей. Смогут ли эти трое противостоять целому миру? Сумеют ли они выжить в этой борьбе?",
                            Ratings = {rating6},
                            Autors = {autor6}
                    },
                    new Book{
                            Name = "Властелин Колец: Возвращение короля",
                            Genre="фантастика",
                            PageNumber = 2156,
                            PublishYear = 2020,
                            ImageName = "Dzhon_R._R._Tolkin__Vlastelin_Kolets_Vozvraschenie_korolya.jpeg",
                            Price = 630,
                            Description = "Джон Рональд Руэл Толкин (3.01.1892—2.09.1973) — писатель, поэт, филолог, профессор Оксфордского университета, родоначальник современной фэнтези. В 1937 году был написан «Хоббит», а в середине 1950-х годов увидели свет три книги «Властелина Колец», повествующие о Средиземье — мире, населенном представителями волшебных рас со сложной культурой, историей и мифологией. В последующие годы эти романы были переведены на все мировые языки, адаптированы для кино, мультипликации, аудиопьес, театра, компьютерных игр, комиксов и породили массу подражаний и пародий. Алан Ли (р. 20.08.1947) — художник-иллюстратор десятков книг в жанре фэнтези. Наибольшую известность приобрели его обложки и иллюстрации к произведениям Джона Р. Р. Толкина: «Хоббит», «Властелин Колец», «Дети Хурина». Также иллюстрировал трилогию «Горменгаст» Мервина Пика, цикл средневековых валлийских повестей «Мабиногион» и многое другое.",
                            Ratings = {rating7},
                            Autors = {autor7}
                    },
                    new Book{
                            Name = "Граф Монте-Кристо",
                            Genre="роман",
                            PageNumber = 632,
                            PublishYear = 2017,
                            ImageName = "Aleksandr_Dyuma__Graf_MonteKristo.jpeg",
                            Price = 214,
                            Description = "Как и сто шестьдесят пять лет назад, \"Граф Монте-Кристо\" Александра Дюма остается одним из самых популярных романов в мировой литературе. К нему писали продолжения, его ставили на сцене, создавали мюзиклы, экранизировали, но и по сей день бесчисленные издания этой книги доставляют удовольствие новым и новым поколениям читателей. История молодого парижанина, которого приятели в шутку засадили в тюрьму, почерпнута автором в архивах парижской полиции. А из-под пера мастера выходит моряк Эдмон Дантес, мученик замка Иф. Не дождавшись правосудия, он решает сам вершить суд и жестоко мстит врагам, разрушившим его счастье. В настоящем издании роман сопровождается полным комплектом иллюстраций французских художников XIX века к первым публикациям «Графа Монте-Кристо». В издание также включена история сапожника Франсуа Пико, взятая из криминальной хроники, послужившая прообразом сюжетных перипетий романа.",
                            Ratings = {rating8},
                            Autors = {autor8}
                    },
                    new Book{
                            Name = "Буря мечей",
                            Genre="фантастика",
                            PageNumber = 732,
                            PublishYear = 2008,
                            ImageName = "Dzhordzh_Martin__Burya_mechej.jpeg",
                            Price = 532,
                            Description = "Перед вами - знаменитая эпопея \"Песнь льда и огня\". Эпическая, чеканная сага о мире Семи Королевств. О мире суровых земель вечного холода и...",
                            Ratings = {rating9},
                            Autors = {autor9}
                    },
                        new Book{
                            Name = "Побег из Шоушенка",
                            Genre="фантастика",
                            PageNumber = 532,
                            PublishYear = 2011,
                            ImageName = "Stiven_King__Pobeg_iz_Shoushenka.jpeg",
                            Price = 632,
                            Description = "Страшный сон, ставший реальностью... История невинного человека, приговоренного к пожизненному заключению в тюремном аду. Жесткая...",
                            Ratings = {rating10},
                            Autors = {autor2}
                    });
                    context.SaveChanges();
                }
        }
    }
}