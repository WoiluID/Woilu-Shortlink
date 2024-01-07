/******************************************************************************/
/*  JAVASCRIPT ASSETS                                                         */
/*----------------------------------------------------------------------------*/
/*  Copyright (C) 2023 MINEVERSAL                                             */
/*  Licensed material of MINEVERSAL                                           */
/*----------------------------------------------------------------------------*/
/*  Object              : JSA (JAVASCRIPT ASSETS)                             */
/*  Outline             : JSA (JAVASCRIPT ASSETS)                             */
/*  File ID             : WOILU-JSA-2                                         */
/*----------------------------------------------------------------------------*/
/*  Author              : Joe                                                 */
/*  Revision Author     : -                                                   */
/*  Created Time        : 2023/12/10 14:16 (UTC+07:00)                        */
/*  Modification Time   : 2023/12/10 14:16 (UTC+07:00)                        */
/*  Version             : 1 (Number of Version)                               */
/*  Revision            : 0 (Number of Revision)                              */
/******************************************************************************/

/******************************************************************************/
/*        CONSTANT DATA                                                       */
/******************************************************************************/

/* Query Selector to Get Input Output Box Element on Page */
const c_obj_inputText = document.querySelector( "#input-output-box" );

/* API Key Encrypt Data */
const c_list_APIKey = ["U2FsdGVkX1/FMyfqlhpPBk9KWao4rqmVtYlKCTxyVCOm3lVe8OqlhOvh7VYp1hdW",
                       "U2FsdGVkX1+L59qt5Zx6Cs3whzasijlCD9j7RDO47njRaoXsmK4kaqJKcWpdRaUM",
                       "U2FsdGVkX1/9so0lfMZoBYvXUu2igRmx83YEVSwvDjjgwLGCXg5qVUK8hgXCcEpp"];

/******************************************************************************/
/*        PRIVATE VARIABLE                                                    */
/******************************************************************************/

/* Shortlink Variable */
let s_str_link = c_obj_inputText.value;       /* Original Main Variable       */
let s_str_linkStatus = c_obj_inputText.value; /* Original Container Variable  */
let s_str_shortlink;                          /* Shortlink Variable           */

/* Session Variable */
let s_tf_sessionStatus;                       /* Session Status               */
let s_str_passphrase;                         /* Passphrase                   */

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_getShortLink                                                       */
/*  Outline:                                                                  */
/*      Convert the URL to shortlink with API                                 */
/*  Parameter:                                                                */
/*      l_str_APIKey                                                          */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Convert the URL to shortlink with API                                 */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      [REF #Zulma-LTLLPW-2_1#];<WOILU-JSA-2_1>                              */
/******************************************************************************/
function fs_getShortLink( l_str_APIKey ) {

    /* Get Input Value (Original Link */
    let l_str_link = c_obj_inputText.value;

    /* Variable & Content to Send to API */
    let l_obj_dataSend = {
        "domain": "woilu.id",      /* Domain Name      */
        "originalURL": l_str_link, /* Original URL     */
        "allowDuplicates": false   /* Allow Duplicates */
    };

    /* Fetch Function to Connect with API */
    fetch( "https://api.short.cm/links/public", {            /* API LINK/URL                                                    */
        method: "POST",                                      /* Method POST/GET                                                 */
        headers: {                                           /* Headers                                                         */
            "accept": "application/json",                    /* Accept                                                          */
            "Content-Type": "application/json",              /* Content Type                                                    */
            "authorization": l_str_APIKey                    /* Authorization | API_KEY                                         */
        },
        body: JSON.stringify( l_obj_dataSend )               /* Body | Contents to Send and receive back response from API      */
    } ).then( function( l_obj_response ) {                   /* Then Call Lambda Function and response from API was a parameter */
        return l_obj_response.json();                        /* Return Back Response Data as JSON to change as a Data Received  */
    } ).then( function( l_obj_dataReceived ) {               /* Then Call Lambda Function and Data Received as a Parameter      */
        c_obj_inputText.value = l_obj_dataReceived.shortURL; /* Change the input box to the Shortlink URL                       */
        s_str_shortlink = l_obj_dataReceived.shortURL;       /* Also send it to the container variable                          */
    } ).then( function() {                                   /* Then Call Lambda Function                                       */
        c_obj_inputText.select();                            /* Select the Input Text                                           */
        document.execCommand( "copy" );                      /* And automatic copy to the Clipboard                             */
    } );

};

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_getOriginalLink                                                    */
/*  Outline:                                                                  */
/*      Get the old original link                                             */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Get the old original link                                             */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      None                                                                  */
/******************************************************************************/
function fs_getOriginalLink() {

    if ( ( /^\s*$/.test( s_str_shortlink ) )     /* Space/Empty Link Checker, If have space on the input, it will be return TRUE */
      || ( s_str_shortlink === null        )     /* Null or Didn't have a Value Checker                                          */
      || ( s_str_shortlink === undefined   ) ) { /* Undefined Variable Checker                                                   */

        alert( "Link has not been shortened!" ); /* Alert Link has not been shortened                                            */

    } else {                                     /* If Input link has been shortened, this program will running                  */

        if ( s_str_link === s_str_shortlink ) {  /* If Input link same with the shortener link, this program will running        */

            alert( "Link has been shorted!" );   /* Alert Link has been shorted                                                  */

        } else {                                 /* If Input link not same with shortener link, this program will running        */

            c_obj_inputText.value = s_str_link;  /* Put the Original Link on the Input Box                                       */
            s_str_linkStatus = s_str_link;       /* Put the Original Link on the Container Variable                              */

        }

    }

};

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_getShortenerLink                                                   */
/*  Outline:                                                                  */
/*      Get the old shortener link if available                               */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Get the old shortener link if available                               */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      None                                                                  */
/******************************************************************************/
function fs_getShortenerLink() {

    if ( ( /^\s*$/.test( c_obj_inputText.value ) )     /* Space/Empty Link Checker, If have space on the input, it will be return TRUE */
      || ( c_obj_inputText.value === null        )     /* Null or Didn't have a Value Checker in Input Box Variable                    */
      || ( c_obj_inputText.value === undefined   ) ) { /* Undefined Variable Checkerin Input Box Variable                              */

        alert( "Please input the link!" );             /* Alert Please Input Link if the Input Box has a empty                         */

    } else {                                           /* IF Input box wasn't empty, this program will running                         */

        /* IF the input box same with shortlink */
        if ( c_obj_inputText.value === s_str_shortlink ) {

            alert( "Link has been shorted!" ); /* Alert will be running */

        /* IF the input box same with the original link */
        } else if ( c_obj_inputText.value === s_str_link ) {

            /* IF Shortlink has not been created */
            if ( ( s_str_shortlink === null      )
              || ( s_str_shortlink === undefined ) ) {

                fs_credentialChecker(); /* Call This Function if shortlink has not been created */

            /* IF Input Box same with the Container Variable to check the status */
            } else if ( c_obj_inputText.value === s_str_linkStatus ) {

                c_obj_inputText.value = s_str_shortlink; /* Change the original link to shortlink  */
                s_str_linkStatus = "";                   /* Container Variable set to empty string */

            /* IF other links, running this program */
            } else {

                fs_credentialChecker(); /* Call This Function if user want create more short link */

            }

        /* IF link other than the original link, running this program */
        } else {

            fs_credentialChecker(); /* Call This Function if user want create more short link with different original link */

        }

    }

};

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_credentialChecker                                                  */
/*  Outline:                                                                  */
/*      Credential Check before using & access the API                        */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      Calling API function or calling alert function                        */
/*  Function Explanation:                                                     */
/*      Credential Check before using & access the API                        */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      [REF #Zulma-JSA-1_3#];<WOILU-JSA-1_3>                                 */
/******************************************************************************/
function fs_credentialChecker() {

    //let l_str_passphrase = CryptoJS.enc.Base64.parse( s_str_passphrase )
    //                       .toString( CryptoJS.enc.Utf8 );

    /* Checking API Key Data One By One with For Looping */
    for ( i of c_list_APIKey ) {

        /* IF API Key decrypt to string same with empty string, continue the program */
        if ( CryptoJS.AES.decrypt( i, s_str_passphrase.toLowerCase() )
             .toString( CryptoJS.enc.Utf8 ) === "" ) {

            continue; /* Continue Program & back to Looping if list have a data after it */

        } else {

            /* IF API KEY decrypt has data to be returned this program will running */
            /* Decrypt API KEY & put in a variable to be a parameter */
            let l_str_APIKey = CryptoJS.AES.decrypt( i, s_str_passphrase.toLowerCase() )
                               .toString( CryptoJS.enc.Utf8 );

            /* Calling fs_getShortLink function and send data API KEY as a Parameter on return */
            return fs_getShortLink( l_str_APIKey );

        }

    }

    /* Alert if you Access the Shortlink Before Login */
    alert( "You Didn't Have Permission to Access This Feature!\nTry to Login Again!" );

    return fs_redirectToLogin(); /* forcing the user to log in again */

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_initSession                                                        */
/*  Outline:                                                                  */
/*      Initialize Session from the previous page                             */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Initialize Session from the previous page                             */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      None                                                                  */
/******************************************************************************/
function fs_initSession() {

    /* Checking The Session */
    /* For Session Storage */
    s_tf_sessionStatus = sessionStorage.getItem( "session" ) === null ?  /* Session Status */
                         localStorage.getItem( "session" )            :
                         sessionStorage.getItem( "session" );
    s_str_passphrase = sessionStorage.getItem( "passphrase" ) === null ? /* Passphrase     */
                       localStorage.getItem( "passphrase" )            :
                       sessionStorage.getItem( "passphrase" );

    /* For Local Storage */
    s_tf_sessionStatus = s_tf_sessionStatus === null ? false : s_tf_sessionStatus; /* Session Status */
    s_str_passphrase = s_str_passphrase === null ? "" : s_str_passphrase;          /* Passphrase     */

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_redirectToLogin                                                    */
/*  Outline:                                                                  */
/*      Illegal Access Anticipate                                             */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Illegal Access Anticipate                                             */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      None                                                                  */
/******************************************************************************/
function fs_redirectToLogin() {

    /* Session Storage Was Destroyed */
    sessionStorage.removeItem( "session" );
    sessionStorage.removeItem( "passphrase" );
    sessionStorage.clear();

    /* Local Storage Was Destroyed */
    localStorage.removeItem( "session" );
    localStorage.removeItem( "passphrase" );
    localStorage.clear();

    window.location.replace( "/" ); /* Go To Login Page */

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_logOut                                                             */
/*  Outline:                                                                  */
/*      Session was destroyed & back to login page                            */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Session was destroyed & back to login page                            */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      None                                                                  */
/******************************************************************************/
function fs_logOut() {

    /* Alert Confirmation */
    let l_tf_confirmation = confirm( "Are you sure want to logout?" );

    /* IF Confirmation was True, Running this program */
    if ( l_tf_confirmation ) {

        /* Session Storage Was Destroyed */
        sessionStorage.removeItem( "session" );
        sessionStorage.removeItem( "passphrase" );
        sessionStorage.removeItem( "decrypt" );
        sessionStorage.clear();

        /* Local Storage Was Destroyed */
        localStorage.removeItem( "session" );
        localStorage.removeItem( "passphrase" );
        localStorage.removeItem( "decrypt" );
        localStorage.clear();

        /* Alert after user Logout */
        alert( "You Success Logout" );

        window.location.replace( "/" ); /* Go To Login Page */

    } else {
            
        /* Do Nothing */

    }

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_copyText                                                           */
/*  Outline:                                                                  */
/*      Copy the shortlink                                                    */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Copy the shortlink                                                    */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      [REF #Zulma-LTLLPW-2_2#];<WOILU-JSA-2_2>                              */
/******************************************************************************/
function fs_copyText() {

    /* Get the text field */
    /* Select the text field */
    c_obj_inputText.select();

    /* Code to copy to the clipboard */
    document.execCommand( "copy" );

    /* Alert the copied text */
    alert( "Link Copied" ); //+ copyText.value);

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_clearText                                                          */
/*  Outline:                                                                  */
/*      Clear the text                                                        */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Clear the text                                                        */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      None                                                                  */
/******************************************************************************/
function fs_clearText() {

    /* Clear link/text on the input box */
    c_obj_inputText.value = "";

}

/******************************************************************************/
/*        TOGGLE FUNCTION                                                     */
/******************************************************************************/

/******************************************************************************/
/*                                                                            */
/*  Function : ENTER TOGGLE FUNCTION                                          */
/*                                                                            */
/*  Input    : EVENT CODE                                                     */
/*                                                                            */
/*  Output   : ALERT | fs_credentialChecker | DOM                             */
/*                                                                            */
/******************************************************************************/
c_obj_inputText.addEventListener( "keyup", function( event ) {

    /* Press Enter, User Will Activate this Condition */
    if ( ( event.code === "Enter"       )     /* Event Code Enter            */
      || ( event.code === "NumpadEnter" )     /* Event Code NumpadEnter      */
      || ( event.keyCode === 13         )     /* Event Code Enter For Mobile */
      || ( event.which === 13           ) ) { /* Event Code Enter For Mobile */

        fs_getShortenerLink();

    /* Press Esc & Delete, User Will Activate this Condition */
    } else if ( ( event.code === "Escape"   )     /* Event Code Escape */
             || ( event.code === "Esc"      )     /* Event Code Esc    */
             || ( event.code === "Delete"   ) ) { /* Event Code Delete */

        c_obj_inputText.value = ""; /* Clear the Input Box */

    /* IF event code wasn't response, Running this program */
    } else {

        s_str_link = c_obj_inputText.value; /* Send Input Box to the Original Variable */

    }

} );

/******************************************************************************/
/*        WINDOW FUNCTION                                                     */
/******************************************************************************/

/******************************************************************************/
/*                                                                            */
/*  Function : WINDOW ONLOAD FUNCTION                                         */
/*                                                                            */
/*  Input    : LOAD                                                           */
/*                                                                            */
/*  Output   : SHOWING SHORTLINK PAGE | REDIRECT TO LOGIN PAGE                */
/*                                                                            */
/******************************************************************************/
window.addEventListener( "load", ( event ) => {

    fs_initSession(); // Initialize the Session

    if ( ( s_tf_sessionStatus      )     /* If Session was True         */
      && ( s_str_passphrase !== "" ) ) { /* and Passphrase have a value */

        /* Do Nothing */
        // alert( "Website Loaded" );

    } else {

        fs_redirectToLogin(); // Back to Login Page

    }

} );

/******** END OF FILE *********************************************************/
