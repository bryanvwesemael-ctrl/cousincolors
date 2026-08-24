import type { ServiceData, ProjectData, FAQItem } from './types';

export const COMPANY = {
  name: 'Cousin Colors',
  tagline: 'Professionele schilderwerken. Persoonlijk uitgevoerd.',
  subtitle: 'Van eerste kleurkeuze tot perfecte afwerking.',
  description:
    'Cousin Colors zorgt voor schilderwerken die je woning opnieuw karakter geven.',
  url: 'https://www.cousincolors.be',
  email: 'info@cousincolors.be',
  phone: '',
  phoneDisplay: '',
  region: 'Bornem, Puurs, Willebroek en omgeving',
  regionCities: ['Bornem', 'Puurs', 'Willebroek', 'Mechelen', 'Antwerpen'],
};

export const TRUST_POINTS = [
  {
    title: 'Persoonlijke aanpak',
    description: 'Je spreekt rechtstreeks met de schilder die de werken uitvoert. Geen tussenpersoon, geen verrassingen.',
  },
  {
    title: 'Professionele afwerking',
    description: 'Aandacht voor detail en een net resultaat waar je jaren plezier van hebt.',
  },
  {
    title: 'Duidelijke afspraken',
    description: 'Vooraf besproken wat er gebeurt, tegen welke prijs en binnen welke termijn.',
  },
  {
    title: 'Zorg voor jouw woning',
    description: 'We gaan respectvol om met je interieur, meubels en spullen. Netjes afgedekt en opgeruimd.',
  },
];

export const SERVICES: ServiceData[] = [
  {
    slug: 'binnenschilderwerken',
    title: 'Binnenschilderwerken',
    shortTitle: 'Binnen',
    tagline: 'Een nieuwe kleur kan een ruimte volledig veranderen.',
    description:
      'Of het nu om je woonkamer, slaapkamer, keuken of gang gaat — Cousin Colors zorgt voor een strakke, verzorgde afwerking van muren en plafonds. We werken netjes, denken mee over kleurkeuze en laten je woning schoon achter.',
    image: 'https://images.pexels.com/photos/8146323/pexels-photo-8146323.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt: 'Sfeervolle, pas geschilderde woonkamer met natuurlijke lichtinval',
    benefits: [
      'Strakke afwerking van muren en plafonds',
      'Grondige voorbereiding: vullen, schuren, gronden',
      'Advies over kleuren en finishes',
      'Netjes afdekken en opruimen',
      'Geen verrassingen: duidelijke afspraken vooraf',
    ],
    applications: [
      'Woonkamers en slaapkamers',
      'Keukens en badkamers',
      'Gangen en trappen',
      'Kantoorruimtes',
      'Nieuwbouw en renovatie',
    ],
    process: [
      'We bespreken welke ruimtes je wilt schilderen en welke kleuren je voor ogen hebt.',
      'We komen langs om de ruimte te bekijken en de ondergrond te beoordelen.',
      'Je ontvangt een duidelijke offerte, afgestemd op jouw project.',
      'We voeren de werken zorgvuldig uit en laten alles netjes achter.',
    ],
    faq: [
      {
        question: 'Moeten meubels verwijderd worden?',
        answer: 'Niet per se. We dekken meubels en vloeren zorgvuldig af. Bij grote meubels of kasten die tegen de te schilderen muur staan, overleggen we vooraf wat het meest praktisch is.',
      },
      {
        question: 'Hoe lang duren binnenschilderwerken?',
        answer: 'Dat hangt af van de oppervlakte en de staat van de muren. Een kamer kan een dag tot enkele dagen duren. We geven je vooraf een duidelijke tijdsindicatie.',
      },
      {
        question: 'Kunnen jullie ook advies geven over kleuren?',
        answer: 'Ja. We denken graag mee over welke kleuren en finishes bij je interieur en woonstijl passen.',
      },
    ],
    metaTitle: 'Binnenschilderwerken | Cousin Colors — Schilder voor woning en interieur',
    metaDescription: 'Professionele binnenschilderwerken voor je woning. Cousin Colors zorgt voor een strakke, verzorgde afwerking van muren en plafonds. Vraag een vrijblijvende offerte aan.',
  },
  {
    slug: 'buitenschilderwerken',
    title: 'Buitenschilderwerken',
    shortTitle: 'Buiten',
    tagline: 'Een goede buitenschilderbeurt beschermt je woning jarenlang.',
    description:
      'Gevels, kozijnen, ramen en deuren verdienen een weerbare verflaag. Cousin Colors zorgt voor de juiste voorbereiding en afwerking zodat je gevel er niet alleen verzorgd uitziet, maar ook beschermd is tegen vocht en weersinvloeden.',
    image: 'https://images.pexels.com/photos/18968164/pexels-photo-18968164.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt: 'Net geschilderde woninggevel met strakke afwerking',
    benefits: [
      'Weerbare verfsystemen voor lange bescherming',
      'Grondige voorbereiding: reinigen, krabben, primen',
      'Strakke afwerking van kozijnen en gevels',
      'Bescherming tegen vocht en weersinvloeden',
      'Duidelijke offerte met de juiste materialen',
    ],
    applications: [
      'Gevels en buitengevels',
      'Kozijnen, ramen en deuren',
      'Houten buitenschrijnwerk',
      'Tuinconstructies en schuren',
      'Risolering en herstelwerk',
    ],
    process: [
      'We bekijken de buitensituatie en beoordelen de staat van de ondergrond.',
      'We bespreken welke verfsystemen het best passen bij je gevel en kozijnen.',
      'Je ontvangt een duidelijke offerte met de werkzaamheden en materialen.',
      'We voeren de werken uit, rekening houdend met het weer en de seizoenen.',
    ],
    faq: [
      {
        question: 'In welk seizoen kunnen buitenschilderwerken uitgevoerd worden?',
        answer: 'Buitenschilderwerken worden best uitgevoerd bij droog weer en gematigde temperaturen, meestal van lente tot herfst. We plannen de werken samen in functie van de weersverwachting.',
      },
      {
        question: 'Hoe vaak moet een gevel opnieuw geschilderd worden?',
        answer: 'Dat hangt af van de ondergrond, het verfsysteem en de weersinvloeden. Over het algemeen gaat een goede buitenschilderbeurt 5 tot 10 jaar mee. We beoordelen samen de staat van je gevel.',
      },
      {
        question: 'Kunnen jullie ook kozijnen schilderen?',
        answer: 'Ja. We schilderen zowel houten als metalen kozijnen, ramen en deuren met de juiste verfsystemen.',
      },
    ],
    metaTitle: 'Buitenschilderwerken | Cousin Colors — Gevels, kozijnen en buitenschilderwerk',
    metaDescription: 'Professionele buitenschilderwerken voor gevels, kozijnen en buitenschrijnwerk. Cousin Colors kiest de juiste verfsystemen voor lange bescherming. Vraag een vrijblijvende offerte aan.',
  },
  {
    slug: 'behangwerken',
    title: 'Behangwerken',
    shortTitle: 'Behang',
    tagline: 'Een verzorgde wandafwerking met oog voor detail.',
    description:
      'Of je nu kiest voor een rustig vlak behang, een textuur of een opvallend patroon — Cousin Colors plaatst je behang strak en verzorgd. We zorgen voor een gladde ondergrond en een naadloos resultaat.',
    image: 'https://images.pexels.com/photos/36050829/pexels-photo-36050829.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt: 'Stijlvol behang met subtiele textuur in een verzorgd interieur',
    benefits: [
      'Strak geplaatst behang zonder naden of bobbels',
      'Gladde ondergrond: afplakken, vullen, schuren',
      'Advies over behangsoorten en patronen',
      'Netjes afwerken langs plafond, plint en hoeken',
      'Geschikt voor elke ruimte, ook vochtige ruimtes',
    ],
    applications: [
      'Woonkamers en slaapkamers',
      'Gangen en trappen',
      'Accentwanden en feature walls',
      'Vlakke en structurele behangsoorten',
      'Fotobehang en panoramabehang',
    ],
    process: [
      'We bespreken welk behang je wilt en bekijken de wanden ter plaatse.',
      'We beoordelen de ondergrond en bereiden deze voor: vullen, schuren, primen.',
      'Je ontvangt een duidelijke offerte met de hoeveelheid behang en werkuren.',
      'We plaatsen het behang strak en verzorgd, van hoek tot hoek.',
    ],
    faq: [
      {
        question: 'Welke soorten behang kunnen jullie plaatsen?',
        answer: 'We plaatsen vrijwel alle soorten: vlak behang, structureel behang, glasvezelbehang, fotobehang en designbehang. We denken graag mee over wat past bij je interieur.',
      },
      {
        question: 'Kan behang over een geverfde muur?',
        answer: 'Dat hangt af van de staat van de verflaag. Soms kan de muur rechtstreeks behangen worden, soms moet de oude verflaag verwijderd of voorbewerkt worden. We beoordelen dit ter plaatse.',
      },
      {
        question: 'Is behang geschikt voor vochtige ruimtes?',
        answer: 'Voor keukens en badkamers kiezen we behangsoorten die bestand zijn tegen vocht, of we combineren behang met een vochtwerende afwerking. We overleggen wat het beste is voor jouw ruimte.',
      },
    ],
    metaTitle: 'Behangwerken | Cousin Colors — Behang plaatsen met oog voor detail',
    metaDescription: 'Professioneel behang plaatsen. Cousin Colors zorgt voor een gladde ondergrond en een strak, naadloos resultaat. Vraag een vrijblijvende offerte aan.',
  },
  {
    slug: 'schuren-en-lakken',
    title: 'Schuren & lakken',
    shortTitle: 'Lakwerk',
    tagline: 'Houtwerk dat er weer als nieuw uitziet.',
    description:
      'Deuren, kozijnen, trappen en houtwerk vergen onderhoud. Cousin Colors schuurt, ontvet en lakt je houtwerk opnieuw zodat het er weer verzorgd uitziet en beschermd is tegen slijtage.',
    image: 'https://images.pexels.com/photos/5974351/pexels-photo-5974351.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt: 'Ambachtelijk schuren en lakken van houten oppervlak',
    benefits: [
      'Grondig schuren en ontvetten',
      'Strakke laklaag zonder druppels of strepen',
      'Geschikte lak voor binnen of buiten',
      'Bescherming tegen slijtage en vocht',
      'Ook voor treden en zwaar belaste oppervlakken',
    ],
    applications: [
      'Binnendeuren en kamerdeuren',
      'Kozijnen en raamkozijnen',
      'Trappen en leuningen',
      'Houten meubilair en kasten',
      'Skirting en profielen',
    ],
    process: [
      'We bekijken het houtwerk en beoordelen de staat van de laklaag.',
      'We bespreken welke afwerking je wilt: mat, zijdeglans of hoogglans.',
      'Je ontvangt een duidelijke offerte met de werkzaamheden.',
      'We schuren, ontvetten en lakken het houtwerk zorgvuldig op.',
    ],
    faq: [
      {
        question: 'Kunnen jullie ook een trap schuren en lakken?',
        answer: 'Ja. Trappen schuren en lakken is een specialiteit. We zorgen voor een strak resultaat dat bestand is tegen dagelijks gebruik.',
      },
      {
        question: 'Welke lak gebruiken jullie?',
        answer: 'We kiezen de lak in functie van de toepassing: watergedragen lak voor binnen, weerbare lak voor buiten, en een slijtvaste afwerking voor trappen en zwaar belaste oppervlakken.',
      },
      {
        question: 'Moeten deuren uit hun hengsels?',
        answer: 'Voor het beste resultaat halen we deuren uit hun hengsels en werken we ze plat af. We overleggen vooraf wat praktisch is in jouw situatie.',
      },
    ],
    metaTitle: 'Schuren & lakken | Cousin Colors — Deuren, kozijnen en houtwerk',
    metaDescription: 'Professioneel schuren en lakken van deuren, kozijnen, trappen en houtwerk. Cousin Colors kiest de juiste lak voor een strak resultaat. Vraag een vrijblijvende offerte aan.',
  },
];

export const PROJECTS: ProjectData[] = [
  {
    id: 'woonkamer-bornem',
    title: 'Woonkamer Bornem',
    location: 'Bornem',
    category: 'Binnen',
    services: ['Binnenschilderwerken'],
    description: 'Een lichte, open woonkamer die een frisse kleur kreeg. De muren en plafonds werden grondig voorbereid en afgewerkt in een warme, neutrale tint.',
    beforeImage: 'https://images.pexels.com/photos/8146336/pexels-photo-8146336.jpeg?auto=compress&cs=tinysrgb&w=1260',
    afterImage: 'https://images.pexels.com/photos/8146323/pexels-photo-8146323.jpeg?auto=compress&cs=tinysrgb&w=1260',
    beforeAlt: 'Lege, onafgewerkte kamer vóór schilderwerken',
    afterAlt: 'Sfeervolle, pas geschilderde woonkamer na schilderwerken',
  },
  {
    id: 'gevel-puurs',
    title: 'Gevel Puurs',
    location: 'Puurs',
    category: 'Buiten',
    services: ['Buitenschilderwerken'],
    description: 'De gevel en kozijnen van deze woning kregen een nieuwe, weerbare verflaag. Na grondige reiniging en voorbereiding een strak en beschermd resultaat.',
    beforeImage: 'https://images.pexels.com/photos/9208091/pexels-photo-9208091.jpeg?auto=compress&cs=tinysrgb&w=1260',
    afterImage: 'https://images.pexels.com/photos/18968164/pexels-photo-18968164.jpeg?auto=compress&cs=tinysrgb&w=1260',
    beforeAlt: 'Woninggevel vóór buitenschilderwerken',
    afterAlt: 'Net geschilderde woninggevel na buitenschilderwerken',
  },
  {
    id: 'behang-willebroek',
    title: 'Accentwand Willebroek',
    location: 'Willebroek',
    category: 'Behang',
    services: ['Behangwerken'],
    description: 'Een stijlvolle accentwand met structureel behang. De ondergrond werd gladgetrokken en het behang strak geplaatst voor een naadloos resultaat.',
    beforeImage: 'https://images.pexels.com/photos/4888555/pexels-photo-4888555.jpeg?auto=compress&cs=tinysrgb&w=1260',
    afterImage: 'https://images.pexels.com/photos/36050829/pexels-photo-36050829.jpeg?auto=compress&cs=tinysrgb&w=1260',
    beforeAlt: 'Kale wand vóór behangwerken',
    afterAlt: 'Stijlvolle wand met structureel behang na behangwerken',
  },
  {
    id: 'deuren-mechelen',
    title: 'Deuren en trap Mechelen',
    location: 'Mechelen',
    category: 'Lakwerk',
    services: ['Schuren & lakken'],
    description: 'Binnendeuren en een eiken trap werden geschuurd en opnieuw gelakt. Een strakke, slijtvaste afwerking die het hout weer tot zijn recht laat komen.',
    beforeImage: 'https://images.pexels.com/photos/5974333/pexels-photo-5974333.jpeg?auto=compress&cs=tinysrgb&w=1260',
    afterImage: 'https://images.pexels.com/photos/5974351/pexels-photo-5974351.jpeg?auto=compress&cs=tinysrgb&w=1260',
    beforeAlt: 'Versleten houtwerk vóór schuren en lakken',
    afterAlt: 'Verzorgd, gelakt houtwerk na schuren en lakken',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Kennismaking',
    description: 'We bespreken wat je woning nodig heeft. Je vertelt je wensen, we luisteren en denken mee.',
  },
  {
    number: '02',
    title: 'Plaatsbezoek',
    description: 'We bekijken de ruimte ter plaatse en bespreken de gewenste afwerking, kleuren en materialen.',
  },
  {
    number: '03',
    title: 'Duidelijke offerte',
    description: 'Je ontvangt een duidelijke offerte, afgestemd op jouw project. Geen verrassingen achteraf.',
  },
  {
    number: '04',
    title: 'Professionele uitvoering',
    description: 'Cousin Colors voert de werken zorgvuldig uit. Netjes, respectvol en met oog voor detail.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Wat kost schilderwerk?',
    answer: 'De prijs hangt af van de oppervlakte, de voorbereiding, de ondergrond en de gewenste afwerking. Een indicatieve prijs start vanaf €20/m², maar de uiteindelijke prijs bespreken we altijd vooraf in een duidelijke offerte. Zo weet je waar je aan toe bent.',
  },
  {
    question: 'Werken jullie met een offerte?',
    answer: 'Ja. We komen langs, bekijken de werken en sturen je een duidelijke offerte. Pas als je akkoord gaat, plannen we de werken in.',
  },
  {
    question: 'Hoe lang duurt schilderwerk?',
    answer: 'Dat hangt af van de oppervlakte en de staat van de muren of het houtwerk. Een kamer kan een dag tot enkele dagen duren, een volledige woning langer. We geven je vooraf altijd een duidelijke tijdsindicatie.',
  },
  {
    question: 'Moeten meubels verwijderd worden?',
    answer: 'Niet per se. We dekken meubels en vloeren zorgvuldig af. Bij grote meubels die tegen de te schilderen muur staan, overleggen we vooraf wat het meest praktisch is.',
  },
  {
    question: 'Doen jullie zowel binnen- als buitenschilderwerk?',
    answer: 'Ja. Cousin Colors voert zowel binnenschilderwerken als buitenschilderwerken uit, evenals behangwerken en schuren & lakken.',
  },
  {
    question: 'Kan ik foto\'s van mijn woning doorsturen?',
    answer: 'Zeker. In het offerteformulier kan je foto\'s uploaden. Zo kunnen we ons al een beter beeld vormen van je project voor we langskomen.',
  },
  {
    question: 'Werken jullie ook met behang?',
    answer: 'Ja. We plaatsen vrijwel alle soorten behang: vlak, structureel, glasvezel, fotobehang en designbehang. We denken graag mee over wat past bij je interieur.',
  },
  {
    question: 'Kunnen jullie houtwerk schuren en lakken?',
    answer: 'Ja. We schuren en lakken deuren, kozijnen, trappen en ander houtwerk. We kiezen de juiste lak in functie van de toepassing en de gewenste afwerking.',
  },
  {
    question: 'In welke regio\'s werken jullie?',
    answer: 'Cousin Colors is actief in Bornem, Puurs, Willebroek, Mechelen en de bredere omgeving. Twijfel je of we jouw gemeente bedienen? Neem gerust contact op.',
  },
  {
    question: 'Wanneer kunnen de werken starten?',
    answer: 'Dat hangt af van de planning en het seizoen, vooral voor buitenschilderwerken. We overleggen samen wanneer het jou het beste uitkomt en plannen de werken in.',
  },
];
