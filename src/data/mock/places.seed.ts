import type { Place, StorySection, StorySectionKind } from '@/types'

/**
 * ALL CONTENT BELOW IS FICTIONAL PLACEHOLDER TEXT.
 * No real restaurant, family, or building is described. Every place is named
 * "(sample)" and carries `isPlaceholder: true`. Do not replace this with real
 * history unless it has been verified with the owner or primary sources.
 */

const SECTION_TITLES: Record<StorySectionKind, string> = {
  family: 'The Family',
  food: 'The Food',
  building: 'The Building',
  neighborhood: 'The Neighborhood',
}

function section(kind: StorySectionKind, ...body: string[]): StorySection {
  return { kind, title: SECTION_TITLES[kind], body }
}

export const placesSeed: Place[] = [
  {
    id: 'la-cocina-dona-marisol-sample',
    name: 'La Cocina de Doña Marisol (sample)',
    neighborhood: 'Pilsen',
    cuisine: 'Mexican home cooking',
    priceTier: 2,
    tags: ['family-owned', 'generations-old', 'neighborhood-institution'],
    summary:
      'A two-day mole, a recipe tin by the register, and three generations who still cook the way the first one did.',
    sections: [
      section(
        'family',
        'Marisol Vega-Ortiz began cooking for neighbors out of her apartment kitchen, one pot of mole at a time. When the line outside her door grew longer than her hallway, her son found a storefront two blocks away.',
        "Today her granddaughter runs the front of the house and keeps Marisol's handwritten recipe cards in a battered tin beside the register. Regulars are welcome to ask to see them.",
      ),
      section(
        'food',
        'The mole rojo takes two days. Dried chiles are toasted, soaked, and ground with seeds, bread, and a little chocolate, then simmered until it clings to the back of a spoon.',
        "The family says the recipe came from Marisol's mother and has barely changed. The tortillas are pressed by hand each morning, and the kitchen runs out of mole before it runs out of anything else.",
      ),
      section(
        'building',
        "A narrow brick storefront with a pressed-tin ceiling the family restored themselves, one panel at a time. The kitchen sits where the building's original bakery oven once stood.",
      ),
      section(
        'neighborhood',
        'The blocks around the restaurant carry layers: church towers built by earlier immigrant communities, murals on brick walls, and families who have stayed for decades. The restaurant is a short walk from the parish hall where its first customers came after Sunday services.',
      ),
    ],
    sourceLabel: 'both',
    sources: [
      {
        label: "Conversation with the owner's granddaughter (sample)",
        kind: 'owner-interview',
        note: 'Recipe origin and family timeline.',
      },
      {
        label: 'Neighborhood Oral History Collection (sample)',
        kind: 'oral-history',
        note: 'Used to check dates and the parish hall detail.',
      },
    ],
    whatToOrder: {
      dish: 'Mole rojo with handmade tortillas',
      why: "It is the dish the whole restaurant grew from, and it tastes like the family's patience: two days of work in every spoonful.",
    },
    askThem: [
      'Whose handwriting is on the oldest recipe card?',
      'What was on the very first plate you ever served?',
      'Which part of the mole do you refuse to rush?',
      'What do regulars still ask for that is not on the menu?',
    ],
    mockDistanceMiles: 0.4,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'pan-dulce-aurora-sample',
    name: 'Pan Dulce Aurora (sample)',
    neighborhood: 'Pilsen',
    cuisine: 'Mexican bakery',
    priceTier: 1,
    tags: ['family-owned', 'immigrant-cuisine', 'neighborhood-institution'],
    summary:
      'A corner bakery that opens before sunrise, run by two brothers who learned the trade from their father.',
    sections: [
      section(
        'family',
        'Rafael and Tomás Aguilar took over the bakery from their father, who first baked bread for the early shift workers on the block. The brothers split the night: Rafael mixes dough at two in the morning, Tomás handles the display and the regulars.',
      ),
      section(
        'food',
        'Conchas are the headline, with a crackled sugar shell that the brothers press with a carved wooden stamp. The recipe uses a slow overnight rise, which gives the bread its tender, slightly tangy crumb.',
        'On weekends the bakery makes pan de muerto in the weeks leading up to the autumn holiday, and neighbors start asking about it in September.',
      ),
      section(
        'neighborhood',
        'The bakery is an early-morning landmark. Bus drivers, nurses coming off night shifts, and parents on the school run all pass through before eight, which is why the brothers keep the first batch at the front of the case.',
      ),
    ],
    sourceLabel: 'owner',
    sources: [
      {
        label: 'Interview with Tomás Aguilar (sample)',
        kind: 'owner-interview',
        note: 'All family and recipe details are as told by the owner.',
      },
    ],
    whatToOrder: {
      dish: 'A warm concha and a cup of café de olla',
      why: "The concha is the bakery's signature, and the spiced coffee is how the brothers' father started every shift.",
    },
    askThem: [
      'What time does the first tray come out of the oven?',
      'Who carved the wooden stamp you use on the conchas?',
      'What is the one pastry your father never let you change?',
    ],
    mockDistanceMiles: 0.5,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'cafe-tinta-sample',
    name: 'Café Tinta (sample)',
    neighborhood: 'Pilsen',
    cuisine: 'Coffee and light bites',
    priceTier: 2,
    tags: ['historic-building', 'community-hub'],
    summary:
      'A coffee shop inside a former print shop, where the old presses still anchor the room.',
    sections: [
      section(
        'food',
        'The menu is small and seasonal: pastries from nearby bakeries, simple sandwiches, and espresso drinks named after typefaces. The most requested item is a cardamom bun that rotates in and out with the weather.',
      ),
      section(
        'building',
        'The building was a neighborhood print shop for most of the last century, producing church bulletins, union flyers, and wedding invitations. When the shop closed, the new owners kept two iron presses in the front window and left the ink-stained floorboards as they were.',
        'Look up: the skylight was installed so typesetters could work by daylight.',
      ),
      section(
        'neighborhood',
        'Printing was once a major trade in the neighborhood, and the café keeps a shelf of old posters from local events. Community groups still meet at the long table in the back.',
      ),
    ],
    sourceLabel: 'researched',
    sources: [
      {
        label: 'City Building Permit Index (sample)',
        kind: 'archive',
        note: 'Construction and use history for the building.',
      },
      {
        label: 'Printers of the Near Southwest Side (sample)',
        kind: 'book',
      },
    ],
    whatToOrder: {
      dish: 'Cardamom bun with a cortado',
      why: 'Sit near the front windows beside the presses: the bun is local, the room is the history.',
    },
    askThem: [
      'Do the presses still work, and has anyone tried to print on them?',
      'What is the oldest poster on the wall?',
      'Which community group has been meeting here the longest?',
    ],
    mockDistanceMiles: 0.7,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'golden-ladle-noodle-house-sample',
    name: 'Golden Ladle Noodle House (sample)',
    neighborhood: 'Chinatown',
    cuisine: 'Cantonese noodles and congee',
    priceTier: 1,
    tags: ['family-owned', 'immigrant-cuisine', 'historic-building'],
    summary:
      'Hand-pulled noodles and slow-cooked congee in a second-floor dining room above a longtime tea shop.',
    sections: [
      section(
        'family',
        "The Lam family opened the restaurant after arriving in Chicago with one wok and a handful of recipes from the owner's mother. Her daughter now manages the dining room and still ladles the congee for the first table of the day herself.",
      ),
      section(
        'food',
        'The congee simmers for six hours with rice, dried scallop, and ginger, and arrives at the table with a spread of toppings: fried dough, scallions, and thousand-year egg for the adventurous.',
        'The noodles are cut to order. The kitchen says the trick is the rest between kneading and cutting.',
      ),
      section(
        'building',
        'The dining room occupies the second floor of a terra-cotta-trimmed building from the early twentieth century. The original tin ceiling and a tall arched window facing the street are still in place.',
      ),
      section(
        'neighborhood',
        'Chinatown is a dense, walkable pocket of family-run businesses. The restaurant sits above a tea merchant, and many customers come up the stairs after buying leaves downstairs.',
      ),
    ],
    sourceLabel: 'both',
    sources: [
      {
        label: 'Conversation with the Lam family (sample)',
        kind: 'owner-interview',
        note: "Family arrival story and the congee recipe's origin.",
      },
      {
        label: 'Architectural Survey of Commercial Streets (sample)',
        kind: 'book',
        note: 'Building style and approximate construction era.',
      },
    ],
    whatToOrder: {
      dish: 'Dried scallop congee with fried dough',
      why: 'It is the dish the first Lam kitchen was built around: slow, restorative, and cooked the same way for decades.',
    },
    askThem: [
      'Which recipe came with your family from the old country?',
      'How did the tea shop downstairs become your neighbor?',
      'What do you serve family that is not on the menu?',
      'Who taught you to cut the noodles?',
    ],
    mockDistanceMiles: 2.8,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'sweet-peach-supper-club-sample',
    name: 'Sweet Peach Supper Club (sample)',
    neighborhood: 'Bronzeville',
    cuisine: 'Southern and soul food',
    priceTier: 3,
    tags: ['historic-building', 'neighborhood-institution', 'community-hub'],
    summary:
      "A supper club in a restored ballroom, where the menu is built around a mid-century neighborhood's favorite dishes.",
    sections: [
      section(
        'family',
        'The current owners are not the founding family. They bought the building after a long search for a place with enough room to host live music, and they credit the earlier tenants with leaving behind a stage, a coat-check window, and a guest book dating back decades.',
      ),
      section(
        'food',
        'The menu leans on dishes that were Sunday staples in the area: smothered pork chops, peach cobbler, and cornbread baked in cast iron. The kitchen works from period cookbooks and community recipe pamphlets, and notes the source on the back of the menu.',
      ),
      section(
        'building',
        'The ballroom on the second floor was built as a social hall in the early twentieth century and later hosted dances and club meetings. The owners restored the sprung dance floor and the original proscenium arch.',
        'The coat-check window is still in use, and the guest book is kept behind the host stand.',
      ),
      section(
        'neighborhood',
        'The surrounding blocks carry a deep history of music, publishing, and Black-owned business. The supper club commissions a rotating local artist to hang work in the lobby each season.',
      ),
    ],
    sourceLabel: 'researched',
    sources: [
      {
        label: 'Community Recipe Pamphlets Collection (sample)',
        kind: 'archive',
        note: 'Menu inspirations and recipe sources.',
      },
      {
        label: 'Social Halls of the South Side (sample)',
        kind: 'book',
        note: 'Context for the building and its early use.',
      },
      {
        label: 'Neighborhood Preservation Report (sample)',
        kind: 'article',
      },
    ],
    whatToOrder: {
      dish: 'Smothered pork chop with greens and cornbread',
      why: 'It is the kind of plate this ballroom once served after dances, and it is cooked from a pamphlet recipe the kitchen has credited by name.',
    },
    askThem: [
      'Which cookbook or pamphlet is your menu working from?',
      'Who signed the oldest page in the guest book?',
      'What did you leave untouched when you restored the ballroom?',
    ],
    mockDistanceMiles: 3.6,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'kafe-nordlys-sample',
    name: 'Kafé Nordlys (sample)',
    neighborhood: 'Andersonville',
    cuisine: 'Scandinavian bakery and café',
    priceTier: 1,
    tags: ['generations-old', 'family-owned'],
    summary:
      'A cardamom-scented bakery run by a family that still bakes from a recipe notebook written in two languages.',
    sections: [
      section(
        'family',
        "The Lindqvist family has baked in this neighborhood for three generations. The founder's recipe notebook is written in two languages, with Swedish notes crossed out and rewritten in English as the bakery grew.",
        "A grandson now runs the ovens. He keeps the notebook locked in the back office, and he'll show it to anyone who asks nicely on a slow afternoon.",
      ),
      section(
        'food',
        'The signature is a cardamom bun with a pearl-sugar crust. The shop also makes open-faced sandwiches on dark rye and a seasonal saffron bun that sells out within an hour in December.',
      ),
      section(
        'neighborhood',
        'The neighborhood has a long Scandinavian heritage, and the bakery is one of several businesses that have kept customs alive through seasonal events, such as a light festival in the dead of winter.',
      ),
    ],
    sourceLabel: 'both',
    sources: [
      {
        label: 'Conversation with Anders Lindqvist (sample)',
        kind: 'owner-interview',
      },
      {
        label: 'Neighborhood Business Directory, 1950s edition (sample)',
        kind: 'archive',
        note: 'Used to confirm the bakery was operating by mid-century.',
      },
    ],
    whatToOrder: {
      dish: 'Cardamom bun with a pot of coffee',
      why: "It is the recipe on the notebook's first page, and the one the founder insisted never be cheapened.",
    },
    askThem: [
      'What does the first page of the recipe notebook say?',
      "Which pastry is your grandfather's, and which is yours?",
      'What changes in the bakery when the winter festival comes around?',
    ],
    mockDistanceMiles: 4.9,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'the-cedar-table-sample',
    name: 'The Cedar Table (sample)',
    neighborhood: 'Albany Park',
    cuisine: 'Levantine',
    priceTier: 2,
    tags: ['family-owned', 'immigrant-cuisine'],
    summary:
      'A family-run Levantine restaurant where the meze arrive in the order the owner serves them at home.',
    sections: [
      section(
        'family',
        'Layla Haddad opened the restaurant after years of feeding extended family every Sunday. Her sons run the grill, and her sister makes the pastries each morning. Dinner here follows the order of a family table: dips first, then salads, then the grill.',
      ),
      section(
        'food',
        "The labneh is strained overnight and finished with olive oil from a cousin's grove. The grilled chicken is marinated for a full day, and the flatbread comes out of the oven so hot it is wrapped in a cloth.",
        'The kitchen makes everything in house, including the pickled turnips that are bright pink from a slice of beet.',
      ),
    ],
    sourceLabel: 'owner',
    sources: [
      {
        label: 'Interview with Layla Haddad (sample)',
        kind: 'owner-interview',
        note: 'Everything here is as told by the owner; the building and neighborhood sections are still being researched.',
      },
    ],
    whatToOrder: {
      dish: 'The mixed meze platter, then the half grilled chicken',
      why: "Order the way Layla's family eats: slowly, in rounds, with the flatbread still hot.",
    },
    askThem: [
      'Which dish is from your own mother, and which is your own?',
      'How do you decide the order the meze arrive in?',
      'Where does the olive oil come from?',
    ],
    mockDistanceMiles: 5.2,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'hearth-and-rail-tavern-sample',
    name: 'Hearth & Rail Tavern (sample)',
    neighborhood: 'Logan Square',
    cuisine: 'Wood-fired New American',
    priceTier: 4,
    tags: ['historic-building'],
    summary:
      'A tasting-menu restaurant in a former rail depot, where the wood-fired hearth stands where the ticket counter once did.',
    sections: [
      section(
        'food',
        'The kitchen cooks almost everything over a single oak-fired hearth. The tasting menu follows the seasons, and the printed menu notes which farm or foraging partner supplied each ingredient.',
        'Dessert is served at the old ticket counter, now a small pastry bar.',
      ),
      section(
        'building',
        'The building opened as a rail depot in the early twentieth century and later served as a freight office and a warehouse. The owners kept the arched windows, the iron roof trusses, and the original ticket counter, which now serves as a pastry bar.',
        'A set of vintage station clocks hangs over the dining room, each stopped at a different hour.',
      ),
      section(
        'neighborhood',
        'The restaurant sits along a rail corridor that once shaped the commercial life of the area. The surrounding blocks have since filled with galleries, bars, and small shops, and the staff will point out what each building used to be.',
      ),
    ],
    sourceLabel: 'researched',
    sources: [
      {
        label: 'Rail Depots of the Northwest Side (sample)',
        kind: 'book',
        note: 'Building history and original use.',
      },
      {
        label: 'City Landmarks Commission Summary (sample)',
        kind: 'archive',
      },
    ],
    whatToOrder: {
      dish: 'The seasonal tasting menu with the pastry-bar dessert',
      why: 'It is the full arc of the room: fire-cooked courses first, then dessert at the counter where passengers once bought tickets.',
    },
    askThem: [
      'Which part of the depot did you decide not to change?',
      'Why are the station clocks all stopped at different hours?',
      'What was on this corner before the restaurant?',
      'Which course is the hearth best at?',
    ],
    mockDistanceMiles: 6.2,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'stockyard-sausage-haus-sample',
    name: 'Stockyard Sausage Haus (sample)',
    neighborhood: 'Bridgeport',
    cuisine: 'Polish and German-style',
    priceTier: 2,
    tags: ['generations-old', 'neighborhood-institution', 'family-owned'],
    summary:
      'A butcher counter and lunch room that has fed workers from the neighborhood for four generations.',
    sections: [
      section(
        'family',
        'The Kowalczyk family started with a single butcher block and a recipe for smoked kielbasa. Four generations later, the shop still sells by the pound from the counter and serves lunch at long communal tables.',
      ),
      section(
        'food',
        'The sausages are smoked in-house over hardwood, and the lunch plate pairs them with sauerkraut, boiled potatoes, and sharp mustard. Fridays are for potato pancakes.',
      ),
      section(
        'building',
        'The shop occupies a low brick building that has been a butcher since long before the current owners. The old meat hooks still hang over the counter, and the original tile floor has been patched but never replaced.',
      ),
      section(
        'neighborhood',
        'The neighborhood grew up around nearby industry, and the shop opened early to feed workers coming off the night shift. Many customers still stop in on their way to work, and some remember when the line stretched around the block.',
      ),
    ],
    sourceLabel: 'both',
    sources: [
      {
        label: 'Conversation with Anna Kowalczyk (sample)',
        kind: 'owner-interview',
      },
      {
        label: 'Neighborhood Trade Index, 1930s edition (sample)',
        kind: 'archive',
        note: "Cross-checked the shop's early years.",
      },
    ],
    whatToOrder: {
      dish: 'The smoked kielbasa lunch plate',
      why: 'It is the first recipe the family ever sold, and still the one the line forms for.',
    },
    askThem: [
      'What wood do you smoke the kielbasa over?',
      'Which regular has been coming the longest?',
      'What would the first Kowalczyk to hold this knife make of the shop today?',
    ],
    mockDistanceMiles: 3.1,
    isPlaceholder: true,
    isClosed: false,
  },
  {
    id: 'varenyky-corner-sample',
    name: 'Varenyky Corner (sample)',
    neighborhood: 'Ukrainian Village',
    cuisine: 'Ukrainian',
    priceTier: 1,
    tags: ['family-owned', 'immigrant-cuisine'],
    summary:
      'A small counter-service shop where dumplings are folded by hand in the window, three generations of the family working side by side.',
    sections: [
      section(
        'family',
        'Oksana Melnyk opened the shop after retiring from a long career as a school cook. Her daughter and granddaughter now fold dumplings alongside her in the front window, where passersby stop to watch.',
      ),
      section(
        'food',
        "The varenyky come filled with potato and farmer's cheese, sauerkraut, or sour cherry. They are boiled to order and finished with browned butter and onion. The borscht is vegetarian and cooked low and slow, as Oksana's mother made it.",
      ),
    ],
    sourceLabel: 'owner',
    sources: [
      {
        label: 'Interview with Oksana Melnyk (sample)',
        kind: 'owner-interview',
        note: 'The building and neighborhood sections have not been written yet.',
      },
    ],
    whatToOrder: {
      dish: 'Potato and cheese varenyky with browned onions',
      why: 'It is the filling Oksana learned first, and the one she still tastes before the shop opens each day.',
    },
    askThem: [
      'Whose hands taught you to fold the dough?',
      'What does the sour cherry filling remind you of?',
      'Which holiday dish do you cook for yourself and not the shop?',
    ],
    mockDistanceMiles: 1.9,
    isPlaceholder: true,
    isClosed: false,
  },
]
