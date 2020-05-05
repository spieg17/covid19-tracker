
const weatherForm = document.querySelector('form')
const search = document.querySelector('#iso')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
fp_date = document.querySelector('#flatpickr')

var dateObj = new Date(); 
 // subtract one day from current time                           
dateObj.setDate(dateObj.getDate() - 1);  

const targetDate = flatpickr('#flatpickr',{
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  defaultDate: dateObj
})


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    
    const iso = search.value
    const fpDate = fp_date.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '


    fetch('/tracker?iso=' + iso + '&date=' + fpDate  ).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                messageOne.textContent = data.error
                xx = ' '
            } else {

                messageOne.textContent = ' '
              xx = ' '
              obj =JSON.parse(JSON.stringify(data) , function(key,value) {
             
                switch (key) {
                  case "date" :
                    xx += '<tr><td>' + key + '<br>' + value + '</td>'
                    break
                             
                  case "confirmed" :
                    xx += '<td>' + key + '<br>' + value + '</td>'
                    break

                  case "deaths" :
                    xx += '<td>' + key + '<br>' + value + '</td>'
                    break
                  
                    case "recovered" :
                    xx += '<td>' + key + '<br>' + value + '</td>'
                    break
                  
                    case "fatality_rate" :
                    xx += '<td>' + key + '<br>' + value + '</td>'
                    break

                  case  "name" :
                    xx += '<td>' + key + '<br>' + value + '</td>'
                    break

                    case "province" :
                    xx += '<td>' + key + '<br>' + value + '</td></tr>'
                     break 
                }
                  return value
              })
            }      
            
             document.getElementById("message-2").innerHTML = xx

    })
  })
})