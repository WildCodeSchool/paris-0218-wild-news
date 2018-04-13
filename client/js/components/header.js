export const createHeader = user=> {
  `<ul>
     <li id="logo">
         <img src="assets/logo_orange.png" alt="logo">
     </li>
     <li>
         <h1>Wild News</h1>
     </li>
     <li class="user">
         <div>
            <div class="user-img">
             <img src="${user.image}" alt="avatar">
            </div>
            <a href="">${user.username}</a>
         </div>
     </li>
  </ul>`
}


// if connection = false {
//   return `<div>
//   <div class="user-img">
//     <img src="src="user-img" alt="avatar">
//     </div>
//     <a href="#"> Log-in Sign-in </a>
//     </div>`
// }
