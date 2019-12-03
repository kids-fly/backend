const data = [{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user/flights`,
    name:'GET /USER - '
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},

{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},

{
    id:0,
    link:`${url}/user`,
    name:'GET /USER - View Profile'
},
]
const url = 'kidsflyapi.herokuapp.com'

const endPointsDiv = document.getElementById('subheading')

data.map(eachData => {
const link = document.createElement('a')
link.title = eachData.name
link.href = eachData.link
 endPointsDiv.appendChild(link)
})