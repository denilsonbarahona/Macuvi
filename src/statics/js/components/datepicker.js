import dayjs from "dayjs";
import Litepicker from "litepicker";
import cash from 'cash-dom';

window.addEventListener("load",()=>{

    window.setDateFilters =()=>{

        cash(".datepicker").each(function () {

            window.dateSetted = true
            let options = {
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                format: "D MMM, YYYY", 
                startDate: "",
                finishDate: "",
                setup: (picker) => {
                    picker.on('button:apply', (startDate, finishDate) => {
                      window.startDate = startDate.format('MM/DD/YYYY')
                      if(finishDate !== null)
                         window.finishDate = finishDate.format('MM/DD/YYYY')
                      options.startDate  = startDate
                      options.finishDate = finishDate                      
                    }) },
                dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                },
            };
    
            if (cash(this).data("single-mode")) {                
                options.singleMode = true;
                options.numberOfColumns = 1;
                options.numberOfMonths = 1;
            }
    
            if (cash(this).data("format")) {                
                options.format = cash(this).data("format");
            }
    
            //if (!cash(this).val()) {
            let date = ""
            if(window.startDate === undefined && window.finishDate === undefined){

                window.startDate  = options.singleMode
                                        ?dayjs().format('MM/DD/YYYY')
                                        :dayjs().add(-1, "month").format('MM/DD/YYYY')

                window.finishDate = dayjs().format('MM/DD/YYYY')
                
                date = options.singleMode
                            ?dayjs().format('MM/DD/YYYY')           
                            :dayjs().add(-1, "month").format(options.format); 
                                    
                date += !options.singleMode
                    ? " - " + dayjs().format(options.format)
                    : "";   

                options.startDate  = window.startDate
                options.finishDate = window.finishDate                
            }else {                    
                date = dayjs(window.startDate).format(options.format);        
                date += !options.singleMode
                    ? " - " + dayjs(window.finishDate).format(options.format)
                    : "";
            }               
            cash(this).val(date);    
          //  }
    
            new Litepicker({
                element: this,
                ...options,
            });
        });
     }

    // Litepicker
    window.setDateFilters();
 
   
})



