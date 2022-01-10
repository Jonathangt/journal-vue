
export default () => ({
    isLoading: true,
    entries:[
    {
        id: new Date().getTime(), //1234566565
        date: new Date().toDateString(), // sat 29, oct
        text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore laboriosam iure excepturi labore. Deserunt illum nostrum officia, tenetur temporibus eaque cum vero voluptates earum sint recusandae magni neque laboriosam vitae?',
        picture:null,
    },
    {
        id: new Date().getTime() + 1000, //1234566565
        date: new Date().toDateString(), // sat 29, oct
        text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore laboriosam iure excepturi labore. Deserunt illum nostrum officia, tenetur temporibus eaque cum vero voluptates earum sint recusandae magni neque laboriosam vitae?',
        picture:null,
    },
    {
        id: new Date().getTime() + 2000, //1234566565
        date: new Date().toDateString(), // sat 29, oct
        text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore laboriosam iure excepturi labore. Deserunt illum nostrum officia, tenetur temporibus eaque cum vero voluptates earum sint recusandae magni neque laboriosam vitae?',
        picture:null,
    },
],
})