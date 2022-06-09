module.exports = async client => {
    client.user.setStatus("dnd");
    console.log(`${client.user} Just Disconnected!`); 
}