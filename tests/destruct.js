let t = [
    {id: 2, name: 'flex'},
    {id: 3, name: 'flex'},
    {id: 4, name: 'flex'},
    {id: 5, name: 'flex'},
    {id: 6, name: 'flex'},
]
let t2 = [
    {id: 2,das: 1},
    {id: 3,das: 2},
    {id: 4,das: 26},
    {id: 5,das: 24},
    {id: 6,das: 23231},
]

let merge = (arr1,arr2) =>{
    return arr1.map((item,i) => {
        if(arr2[i].id === item.id){
            return Object.assign({},item,arr2[i])
        }
    })
}
let t3 = merge(t,t2)
console.log(t3)