
const getTags = () => {
    const CurrentShows = ["electronic",
                        "experimental",
                        "electronica",
                        "talk show",
                        "ambient",
                        "hip hop",
                        "miscellaneous",
                        "bass",
                        "club",
                        "dub",
                        "eclectic",
                        "house",
                        "indie",
                        "jazz",
                        "leftfield",
                        "pop culture",
                        "rock",
                        "soul",
                        "soundscape",
                        "talkshow",
                        "underground",
                        "world",
                        "algorithmic",
                        "arxiu",
                        "avant-garde",
                        "avantgarde",
                        "barcelona",
                        "beats",
                        "berlinbarcelona",
                        "caribe",
                        "contemporary",
                        "conversacion",
                        "costumbrisme",
                        "cultura pop",
                        "d&b",
                        "disco",
                        "diva house",
                        "diy",
                        "doom",
                        "downtempo",
                        "ecofeminismo",
                        "editorial",
                        "entrevista",
                        "field recording",
                        "flinta",
                        "folclore",
                        "garage",
                        "groove",
                        "hip-hop",
                        "industrial",
                        "interviews",
                        "label",
                        "latin",
                        "latinoamerica",
                        "libros raros",
                        "live coding",
                        "local",
                        "meigacore",
                        "metal",
                        "morning",
                        "music",
                        "musica",
                        "nocturn",
                        "noise",
                        "northernsoul",
                        "novetats",
                        "outsiders",
                        "philosophy",
                        "podcast",
                        "poetry",
                        "postindustrial",
                        "post-metal",
                        "post-punk",
                        "producción",
                        "production",
                        "progressive",
                        "psych",
                        "psychology",
                        "punk",
                        "radioart",
                        "rap",
                        "r&b",
                        "sound",
                        "sound collage",
                        "soundtrack",
                        "space",
                        "spoken word",
                        "storytelling",
                        "subculturas",
                        "techno",
                        "trap",
                        "ufo",
                        "uk",
                        "urban",
                        "variopinta",
                        "world music"];
    const Bsides = ["electronica"
,"dj set"
,"electronic"
,"ambient"
,"club"
,"techno"
,"breaks"
,"house"
,"bass"
,"experimental"
,"live"
,"beats"
,"dub"
,"electro"
,"uk garage"
,"eclectic"
,"entrevista"
,"hip hop"
,"latin"
,"community"
,"idm"
,"arquitectura"
,"b2b"
,"bcn crea"
,"disco"
,"disseny"
,"world"
,"acid"
,"deep house"
,"downtempo"
,"ecologia"
,"leftfield"
,"deconstructed"
,"festival"
,"grime"
,"pop"
,"radio"
,"rave"
,"rock"
,"trance"
,"trap"
,"acid house"
,"agua"
,"aigua"
,"brazil"
,"b-sides"
,"dubstep"
,"dub techno"
,"garage"
,"jungle"
,"latincore"
,"metal"
,"perreo"
,"podcast"
,"psychedelic"
,"punk"
,"radios"
,"rap"
,"r&b"
,"reggae"
,"soul"
,"tech house"
,"urban"
,"2 step"
,"80's"
,"abstract"
,"afrobeats"
,"algorithm"
,"alternative"
,"arte"
,"asmr"
,"bailanta"
,"barcelona"
,"batida"
,"big room"
,"blues"
,"chamber"
,"chile"
,"classical"
,"club music"
,"collective"
,"dance"
,"dancehall"
,"dark"
,"dark ambient"
,"dark wave"
,"debut"
,"deep"
,"deep techno"
,"dembow"
,"dj"
,"djset"
,"documental"
,"doom metal"
,"dreamy"
,"drill"
,"drone"
,"drum & bass"
,"dubsteb"
,"easy listening"
,"electro pop"
,"emerging"
,"entrevistes"
,"event"
,"extreme metal"
,"fantazia"
,"flamenco"
,"folk"
,"future beats"
,"gqom"
,"grooves"
,"guaracha"
,"hard"
,"hard drum"
,"hard groove"
,"hardstyle"
,"heavy metal"
,"hip-hop"
,"house music"
,"hypnotic"
,"hypnotic techno"
,"impro"
,"indie"
,"indie-rock"
,"instinto"
,"japon"
,"jazz house"
,"jazzy"
,"kpop"
,"latin club"
,"latino"
,"lofi house"
,"makina"
,"mathcore"
,"melodic techno"
,"melodrama"
,"menhir"
,"music"
,"new age"
,"noise"
,"playlist"
,"poesia"
,"post punk"
,"post-rock"
,"psytrance"
,"queer"
,"radio show"
,"release"
,"rocksteady"
,"roots"
,"seminario"
,"social"
,"soft rock"
,"spiritual"
,"synth pop"
,"synt-punk"
,"talk show"
,"talkshow"
,"tech-house"
,"ukg"
,"uk hardcore"
,"uk techno"
,"underground"
,"vinyl"
,"word"
,"yacht rock"];
    return {
        CurrentShows,
        Bsides
    };
}

export default getTags;