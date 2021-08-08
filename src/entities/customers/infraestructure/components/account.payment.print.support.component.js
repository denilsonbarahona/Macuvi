import { React }  from 'react'

const PrintPayment =(props)=>{


    return (
        <div>
            <style>{`@media print  
                    {                    
                        body { margin:0; padding:6px; }                        
                        .main-container{ width:90mm; }
                        .productName {
                            width: 85px;
                            margin-bottom:0px
                        }
                        .ticketHeader{  
                            color: #000000;
                            font-size: 0.875em;
                            line-height: 1.71;
                            font-family: sans-serif;
                            text-align: justify;
                            text-justify: inter-word;
                            font-weight: 500;
                            margin: 0px;
                        }
                        #watermark-background{
                            position: absolute;
                            z-index:-100;
                            display: flex;
                            align-items: center;
                            height:100%; 
                            width: 112%;
                        }
                        #bg-text{
                            color:lightgrey;
                            font-size:80px;
                            margin-top: -30%;
                            margin-left: -10%;
                            transform:rotate(300deg);
                            -webkit-transform:rotate(300deg); 
                        }  
                        .ticketTableHeader{
                            font-size: 0.875em;
                            color: #000000;
                            padding-bottom: 10px;
                        }
                        .ticketTableContent{  
                            color: #000000;
                            font-size: 0.76em;
                            line-height: 1.71;
                            font-family: sans-serif;
                            text-align: justify;
                            text-justify: inter-word;
                            font-weight: 500;
                            margin: 0px;
                        }                                                        
                    }
                    @page { size: 70mm 500mm; }`}
            </style>
            <br/>
            <div>
                <div> <p style={{textAlign:"center"}} className="ticketHeader" ><b>{props.state.company}</b></p> </div>
                
                <br/>
                <div><p style={{margin:"10px"}}  className="ticketTableContent font-medium"> El cliente {props.state.name} ha 
                                                            realizado el abono de <b>L { Number(props.state.pay).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</b> a su cuenta por cobrar </p></div>
                <br/>
                <div><p style={{margin:"10px"}} className="ticketTableContent"><b>Día: </b>{new Date(props.state.day.replaceAll("-","/")).toLocaleDateString()}</p></div>                
                <div><p style={{margin:"10px"}} className="ticketTableContent"><b>Referencia: </b>{props.state.reference}</p></div>
                <br/><br/>
                <div> <p style={{textAlign:"center"}} className="ticketHeader" ><b>Comprobante impreso en macuvi.io</b></p> </div> 
            </div>
        </div>
    )
}

export default PrintPayment;