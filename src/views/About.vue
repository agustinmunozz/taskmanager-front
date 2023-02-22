<template>
  <div class="about">    
    <div class="container">
      <div class="row mb-3 ">
        <div class="col-md-12 d-flex p-2 justify-content-center">
          <h2>Welcome!</h2>
        </div>
      </div>
      <div>
        <h3>
          <div class="row">
            <label >
              This website was developed using Vue Js 2 in the views, with .NET core 6.0 to develop the APIs 
              and using Entity framework to connect to the database. 
            </label>
            <label>  
              The function of the website is to be able to create different types of tasks and manage them
            </label>
          </div>
          <div class="row pt-3">
            <label>
              - Task – A Task has the following attributes:
            </label>
            <label>
              Created Date, Required by Date, Task Description, Task Status
              Task Type, User Id.
              Comments – possible to add comments to a task which has the following attributes: 
              Create Date, Comment, Comment Type, Reminder Date.
          </label>
          </div>
          <div class="row pt-3">
            <label>
              - The Comments are maintainable – The user can change the information at any time.
            </label>
          </div>
          <div class="row pt-3">
            <label>
              - There are the ability to add multiple comments per task and can also be deleted.
            </label>
          </div>
          <div class="row pt-3">
            <label>
              - Search page on comments - allows the above search criteria in one part of the screen and 
              displays search results. The results are displayed and by clicking on any of them you can 
              open the corresponding comment form.
            </label>
          </div>
          <div class="row pt-3">
            <label>
              - Search page on Task - allows the above search criteria in one part of the screen and 
              displays search results. The results are displayed and by clicking on any of them, you 
              can open the corresponding task form. You can also view all comments about the task and
              edit them.
            </label>
          </div>
        </h3>
      </div>
    </div>
  </div>
</template>
