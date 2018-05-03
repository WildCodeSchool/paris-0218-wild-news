const createHeader = () =>
  `
 <!-- headbar -->
<nav>
  <div class="headbar">
    <ul>
      <li id="logo">
        <a href="http://localhost:5000/">
        <img src="assets/wildnewslogo.png" alt="logo">
        </a>
      </li>
      
   
      <!-- user -->
      <!-- navbar debut -->
      <nav class="navbar">
      <ul>
      <li>
        <a href="http://localhost:5000/">Home</a>
      </li>
<div id="navbar">             
      </div>

      </li>
    </ul>
  </nav>
</ul>
</div>


<div class="menu-icon">
          <i class="fas fa-user-circle fa-3x"></i>
        
    </div>
    <div class="sidebar">
          <a href="#"><img src="assets/user.png"></a>
          <ul class="menu"> 
               
              <li><a href="profil.html"><i class="far fa-user"></i></br>My Profil</a></li> 
              <li><a href="#"><i class="fas fa-chart-line"></i></br>Most Populars</a></li> 
              <li><a href="#"><i class="far fa-newspaper"></i></br>Recent Posts</a></li> 
              <li id="btn-category">
              <a href="#"><i class="fas fa-plus-square" aria-hidden="true"></i></br>Add Categories  </a></li>
            
             
          </ul>

        <div id="my-modal-cat" class="modal">
        <!-- Modal content -->
          <div class="modal-content">
            <div class="modal-header">
              <span class="close-cat">&times;</span>
              <h2>Create a new category</h2>
            </div>
            <div class="modal-body">
              <form id="add-category">
                <label>
                  Title:
                  <input type="text" id="title-category" name="title category">
                </label>
                <label>
                  Description:
                  <textarea type="text"  id="description-category" name="description-category"></textarea>
                </label>
                <label>
                  Image of category:
                  <input type="text" id="img-category" name="image-category">
                </label>
                
                <button type="submit" value="Create my category" onclick="window.parent.location.reload();window.close()">
                  Create my category...
                </button>
              </form>

            </div>
          </div>
        </div>

          </ul> 
          <ul class="social-icon">
            <li><a href="#"><img src="assets/logo_orange.png"></a></li>
            <li><a href="#"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="far fa-address-book" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fab fa-google" aria-hidden="true"></i></a></li>

        </ul>
    </div>
</nav>
      <!-- fin du headbar -->

    </ul>
  </div>
  `
document.querySelector('header').innerHTML = createHeader()
