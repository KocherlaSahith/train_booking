const popupContent = `
<html>
  <head>
    <title>Popup Window</title>
    <style>
      /* CSS styles here */
    </style>
  </head>
  <body>
    <div class="popup-container">
      <h1 class="popup-title">Popup Window</h1>
      <form class="popup-form" onsubmit="submitForm(event)">
        <label class="form-label">
          Task Name:
          <input type="text" class="form-input task-name-input" id="taskName" value="\${taskName}" />
        </label>
        <div class="form-row">
          <label class="form-label">
            Minute:
            <input type="text" class="form-input" id="minute" />
          </label>
          <label class="form-label">
            Hour:
            <input type="text" class="form-input" id="hour" />
          </label>
          <label class="form-label">
            Day:
            <input type="text" class="form-input" id="day" />
          </label>
          <label class="form-label">
            Month:
            <input type="text" class="form-input" id="month" />
          </label>
          <label class="form-label">
            Week:
            <input type="text" class="form-input" id="week" />
          </label>
        </div>
        <button type="submit" class="form-submit-button">Submit</button>
      </form>
    </div>

    <script>
      function submitForm(event) {
        event.preventDefault();
        
        const taskName = document.getElementById('taskName').value;
        const minute = document.getElementById('minute').value;
        const hour = document.getElementById('hour').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const week = document.getElementById('week').value;
        
        const formData = {
          taskName,
          minute,
          hour,
          day,
          month,
          week
        };
        
        console.log(formData);
      }
    </script>
  </body>
</html>
`;

export default popupContent;
