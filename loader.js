class Loader{
    constructor(root){
        this.loader = root.querySelector("[data-name='loader']")
    }
add(object)
{
    object.classList.add('loading')
}
remove(object)
{
    object.classList.remove('loading')
}
}
