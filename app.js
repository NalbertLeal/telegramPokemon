const https = require('https');

let pokemomApi = (id_pokemom) => {
    https.get("http://pokeapi.co/api/v2/pokemon/"+id_pokemom, (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => {
            data += chunk;
        });

        apiRes.end(end, () => {
            return res.json({
                method: 'sendMessage',
                chat_id: update.message.chat.id,
                text: data.body.name
            });
        });
    })
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.pokemon = (req, res) => {
  	const update = req.body;
    if(update.hasOwnProperty("message")) {

        let id_pokemon = update.message.text;
        if(949 < id_pokemon || id_pokemon < 0) {
            return res.json({
                method: 'sendMessage',
                chat_id: update.message.chat.id,
                text: "unknown pokemon"
            });
        }

        pokemonId(id_pokemon);
        // return res.json({
        //     method: 'sendMessage',
        //     chat_id: update.message.chat.id,
        //     text: pokemonId(id_pokemon)
        // });
    }
    else {
        return res.json({
            method: 'sendMessage',
            chat_id: update.message.chat.id,
            text: "unknown pokemon"
          });;
    }
  };