class EventEmmiter
{
    constructor()
    {
    this.handlers = []
    }
}
addListener()
{
    this.handlers.push(yourListener);
}
emit(data)
{
    this.handlers.forEach(item => {
        item(data)
    });
}