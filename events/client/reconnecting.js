module.exports = async client => {
    client.user.setStatus("idle");
    console.log(`${client.user} is Reconnecting`); 
}