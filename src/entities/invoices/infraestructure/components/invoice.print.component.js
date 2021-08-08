import {React} from 'react';

const InvoicePrinted=(props)=>{
    return (
        <div id="invoice-POS">
            <style>
                {`@media print {
                    .page-break { display: block; page-break-before: always; }
                }
                 
                #watermark-background{
                    position: absolute;
                    z-index: 100;
                    display: flex; 
                    height:50%; 
                    width: 50%;
                }
                #bg-text{
                    color:lightgrey;
                    font-size:30px;
                    margin-top: 0%;
                    margin-left: 0%; 
                } 
                #invoice-POS { 
                  padding: 2mm; 
                  background: #FFF;
                }

                #invoice-POS ::selection {
                 background: #f31544;
                 color: #FFF;
                }

                #invoice-POS ::moz-selection {
                 background: #f31544;
                 color: #FFF;
                }

                #invoice-POS h1 {
                 font-size: 1.5em;
                 color: #222;
                }
                #invoice-POS h2 {
                 font-size: .9em;
                }
                #invoice-POS h3 {
                  font-size: 1.2em;
                  font-weight: 300;
                  line-height: 2em;
                }
                #invoice-POS p {
                 font-size: .7em;
                 color: #000;
                 line-height: 1.2em;
                }
                #invoice-POS #top, #invoice-POS #mid, #invoice-POS #bot {
                  border-bottom: 1px solid #EEE;
                }
                #invoice-POS #top {
                  min-height: 100px;
                }
                #invoice-POS #mid {
                  min-height: 80px;
                }
                #invoice-POS #bot {
                  min-height: 50px;
                }
                #invoice-POS #top .logo {
                 height: 60px;
                 width: 60px;
                 background-size: 60px 60px;
                }

                #invoice-POS .clientlogo {
                 float: left;
                 height: 60px;
                 width: 60px;
                 background-size: 60px 60px;
                 border-radius: 50px;
                }

                #invoice-POS .info {
                 display: block;
                 margin-left: 0;
                }
                #invoice-POS .title {
                 float: right;
                }
                #invoice-POS .title p {
                  text-align: right;
                }
                #invoice-POS table {
                 width: 100%;
                 border-collapse: collapse;
                }
                #invoice-POS .tabletitle {
                 font-size: .7em;
                 background: #EEE;
                }
                #invoice-POS .service {
                 border-bottom: 1px solid #EEE;
                }
                #invoice-POS .item {
                 width: 24mm;
                }
                #invoice-POS .itemtext {
                 font-size: .65em;
                }
                #invoice-POS #legalcopy {
                 margin-top: 5mm;
                }`}
            </style> 

            <center id="top">
                <div className="logo" />
                <div className="info"> 
                  <h2>{props.invoice.companyName}</h2>
                </div> 
            </center> 
            <div id="mid">
                <div className="info">
                    <p> 
                        Dirección : { props.invoice.companyAddress }<br />
                        Email     : { props.invoice.companyEmail }<br />
                        Teléfono  : { props.invoice.companyPhone } <br />
                        RTN       : { props.invoice.companyRTN } <br /><br/>
                        Factura   : { props.invoice.invoiceNumber } <br />
                        Factura Inicial: { props.invoice.companyValidRange.init } <br />
                        Factura Final:  { props.invoice.companyValidRange.end } <br />
                        Limite de emisión: { props.invoice.companyLimitDateInvoice } <br /><br/>
                        Fecha de emisión: {props.invoice.invoiceDate } <br />
                        Emitido por: {props.invoice.invoiceCreatedBy} <br /><br/>
                        Cliente: {(props.invoice.invoiceCustomer !=="")
                                    ?(props.invoice.invoiceCustomer.label.split("-").length>1)
                                        ?props.invoice.invoiceCustomer.label.split("-")[1]
                                        :props.invoice.invoiceCustomer.label.split("-")[0]
                                    :"Factura sin nombre"} <br/>
                        RTN: {(props.invoice.invoiceCustomer==="")
                                ?"SIN RTN"
                                :(props.invoice.invoiceCustomer.RTN === undefined)
                                    ?"SIN RTN"
                                    :props.invoice.invoiceCustomer.RTN || "SIN RTN"}<b/>
                    </p>
                </div>
            </div> 
        <div id="bot">
            <div> 
                <span id="bg-text">{  ([undefined,"",1].includes(props.invoice.invoiceState)?"": "ANULADO" ) }</span>
            </div> 
            <div id="table">
            <table>
                <tbody><tr className="tabletitle">
                    <td className="item"><h2>Prod</h2></td>
                    <td className="Hours"><h2>Cant</h2></td>
                    <td className="Rate"><h2>Total</h2></td>
                </tr>
                {props.invoice.invoiceProducts.map((item , index)=>(
                    <tr key={index} className="service">
                        <td className="tableitem"><p className="itemtext">{ item.name } </p></td>
                        <td className="tableitem"><p className="itemtext">{ item.pQuantity }</p></td>
                        <td className="tableitem"><p className="itemtext">L { Number(item.total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</p></td>
                    </tr>
                ))} 
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>SubTotal</h2></td>
                    <td className="payment"><h2>L { Number(props.invoice.invoiceSubTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>Descuento</h2></td>
                    <td className="payment"><h2>-L { Number(props.invoice.invoiceDiscount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>Importe exonerado</h2></td>
                    <td className="payment"><h2>L { (props.invoice.invoiceIsExonerated !== 1 )
                                                        ?"0.00"
                                                        :Number(props.invoice.invoiceTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>Importe exento</h2></td>
                    <td className="payment"><h2>L { (props.invoice.invoiceIsExonerated ===1 || props.invoice.invoiceTax[0] === undefined) 
                                                        ?"0.00"
                                                        :Number(props.invoice.invoiceTax[0].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>Importe gravado 15%</h2></td>
                    <td className="payment"><h2>L { (props.invoice.invoiceTax[15] === undefined)
                                                        ?"0.00"
                                                        :Number(props.invoice.invoiceTax[15].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>Importe gravado 18%</h2></td>
                    <td className="payment"><h2>L {(props.invoice.invoiceTax[18] === undefined)
                                                        ?"0.00"
                                                        :Number(props.invoice.invoiceTax[18].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>ISV(15%)</h2></td>
                    <td className="payment"><h2>L { (props.invoice.invoiceTax[15] === undefined)
                                                        ?"0.00"
                                                        :Number(props.invoice.invoiceTax[15].calculate).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>ISV(18%)</h2></td>
                    <td className="payment"><h2>L { (props.invoice.invoiceTax[18] === undefined)
                                                        ?"0.00"
                                                        :Number(props.invoice.invoiceTax[18].calculate).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                <tr className="tabletitle">
                    <td />
                    <td className="Rate"><h2>Total</h2></td>
                    <td className="payment"><h2>L {Number(props.invoice.invoiceTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h2></td>
                </tr>
                </tbody></table>
            </div>
            <div id="mid">
                <div className="info">
                    <p> 
                        Cliente : ____________________________<br />
                        Original: Cliente <br />
                        Copia: Obligado tributario emisor <br />
                        Tipo de venta: {props.invoice.invoicePaymentMethod} <br />
                        Cambio para el cliente: L { (props.invoice.invoiceChange===undefined)
                                                    ?"0.00"
                                                    :Number(props.invoice.invoiceChange).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} <br />
                        N° de compra exenta : {props.invoice.exoneratedPurchaseNumber} <br />
                        N° de identificación SAG: {props.invoice.exoneratedSAGNumber } <br />
                        N° de constancia de registros exonerados: {props.invoice.exoneratedCertificatedNumber} <br /><br/>
                        Total de: {props.invoice.invoiceTotalToWord}  <br />
                    </p>
                </div>
            </div> 
            <div id="legalcopy">
                <p className="legal"><strong>Factura emitida en www.macuvi.io</strong>  Muchas gracias por tu compra, ¡te esperamos!.</p>
            </div>
        </div>
        </div> )
}

export default InvoicePrinted;