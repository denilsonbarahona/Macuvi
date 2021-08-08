import React from 'react';

const UiLoading=(loading)=>{

    return(
        <> {(loading.loading)
                ?( <div className="h-10">
                        <br/>
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                            <img className="h-10" alt="" src="/assets/images/black.gif"></img>
                        </div>
                        <br/>
                    </div> )
                :( <></> )}
        </>
    )
}



export default UiLoading;