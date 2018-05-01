const createHeader = () =>
  `
   <!-- headbar -->
  <div class="headbar">
    <ul>
      <li id="logo">
        <a href="/">
        <img src="assets/logo_orange.png" alt="logo">
        </a>
      </li>
      <li>
        <h1>Wild News</h1>
      </li>
      <li class="user">
        <div>
          <div class="user-img"></div>
          <a href="/">Log in - Sign in</a>
        </div>
      </li>
    </ul>
  </div>
    <!-- navbar -->
  <nav class="navbar">
    <ul>
      <li>
        <a href="/">Home</a>
      </li>

      <!-- INSERT CATEGORIES -->
      <div id="navbar">
      </div>

      <li class="add" id="btn-category">
        Add
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

                <button type="submit" value="Create my category">
                  Create my category...
                </button>
              </form>

            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  `
document.querySelector('header').innerHTML = createHeader()
