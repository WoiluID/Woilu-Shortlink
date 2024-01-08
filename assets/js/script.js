/******************************************************************************/
/*  JAVASCRIPT ASSETS                                                         */
/*----------------------------------------------------------------------------*/
/*  Copyright (C) 2023 MINEVERSAL                                             */
/*  Licensed material of MINEVERSAL                                           */
/*----------------------------------------------------------------------------*/
/*  Object              : JSA (JAVASCRIPT ASSETS)                             */
/*  Outline             : JSA (JAVASCRIPT ASSETS)                             */
/*  File ID             : WOILU-JSA-1                                         */
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

/* Encrypt Data for Access The URL */
const c_list_passPhraseList = ["U2FsdGVkX1/LmjxVaQFMSl5AY5Aysg0T+D3j6ajmtXUGPrlXdX0z/4BVtci1BqndjRXlxIv4ncdtiGVLRjHZCA==",
                               "U2FsdGVkX1+8bqSyy/y6opml2r9y0jGoBkQ/oe1v/JKzHE/Rq5VwdJho1RYg6Nc1JBDooJNDtKTnFZ2yLoGCdA==",
                               "U2FsdGVkX18fHWv7mMbyoNJLOvu5xkaTiDQox1MNmZuLzHH37qBzuPvwSL7/wB811kzgAE+BnKltoSPN4+GqxA=="];

/* Input Box Object */
const c_obj_inputUsername = document.querySelector( "#username" );
const c_obj_inputPassword = document.querySelector( "#password" );
const c_obj_inputPassphrase = document.querySelector( "#passphrase" );

/* Session Variable */
let s_tf_sessionStatus;                       /* Session Status               */
let s_str_passphrase;                         /* Passphrase                   */
let s_str_decryptLink;                        /* Decrypt Link                 */

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_readAPI                                                            */
/*  Outline:                                                                  */
/*      Read data from API and parse data to object data when the function is */
/*      called                                                                */
/*  Parameter:                                                                */
/*      URL API                                                               */
/*  Return Value:                                                             */
/*      None                                                                  */
/*  Function Explanation:                                                     */
/*      Read data from API and parse data to object data when the function is */
/*      called                                                                */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      [REF #Zulma-JSA-1_1#];<WOILU-JSA-1_1>                                 */
/******************************************************************************/
function fs_readAPI( l_str_file ) {

    /* API Request */
    let l_obj_rawFile = new XMLHttpRequest();             /* Object API Request */
    l_obj_rawFile.overrideMimeType( "application/json" ); /* Raw Type JSON */
    l_obj_rawFile.open( "GET", l_str_file, true );        /* Get Method to Access The API */
    l_obj_rawFile.onreadystatechange = function() {

        /* IF State Was 4 & Status Code was 200 */
        if ( ( l_obj_rawFile.readyState === 4 )
          && ( l_obj_rawFile.status == "200"  ) ) {

            let l_obj_data = JSON.parse( l_obj_rawFile.responseText ); /* Parse Data From API */
            let l_str_confirm = fs_str_authData( l_obj_data );         /* String URL | String Fail */

            if ( l_str_confirm === "Wrong Username/Password!" ) {

                alert( l_str_confirm ); /* Alert if Fail Login */

            } else {

                window.location.replace( l_str_confirm ); /* Go To Shortlink Page */

            }

        }

    }

    l_obj_rawFile.send( null );

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_str_authData                                                       */
/*  Outline:                                                                  */
/*      Authenticating the user input with API data                           */
/*  Parameter:                                                                */
/*      Parsed data object from the API                                       */
/*  Return Value:                                                             */
/*      String of payload or failure messages                                 */
/*  Function Explanation:                                                     */
/*      Authenticating the user input with API data                           */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      [REF #Zulma-JSA-1_2#];<WOILU-JSA-1_2>                                 */
/******************************************************************************/
function fs_str_authData( l_obj_data ){

    /* Get Username, Password & Passphrase data from input Form */
    const c_str_username = c_obj_inputUsername.value;
    const c_str_password = c_obj_inputPassword.value;
    const c_str_passphrase = c_obj_inputPassphrase.value;

    /* Hashing the Username & Password */
    const c_obj_hashUsername = CryptoJS.SHA1( c_str_username.toLowerCase() );
    const c_obj_hashPassword = CryptoJS.SHA1( c_str_password.toLowerCase() );
    
    /* Checking Data One by One with For Looping */
    for ( i = 0; i < Object.keys( l_obj_data.accounts ).length; i++ ) {

        /* IF Username & Password same with Data from API */
        if ( ( l_obj_data.accounts[i].username === String( c_obj_hashUsername ) )
          && ( l_obj_data.accounts[i].password === String( c_obj_hashPassword ) ) ) {

            /* IF passphrase decrypt to string same with empty string, continue the program */
            if ( CryptoJS.AES.decrypt( l_obj_data.accounts[i].passphrase,
                 c_str_passphrase.toLowerCase() ).toString( CryptoJS.enc.Utf8 ) === "" ) {

                continue; /* Continue Program & back to Looping if API have a data after it */

            } else {

                /* IF passphrase decrypt has data to be returned this program will running */

                /* Decrypt Paraphrase & return it back */
                let l_str_decryptPassPhrase = CryptoJS.AES.decrypt( 
                    l_obj_data.accounts[i].passphrase,
                    c_str_passphrase )
                    .toString( CryptoJS.enc.Utf8 );

                /* Credentials Session & Cookies */

                /* Local Storage */
                //localStorage.setItem( "username", c_str_username );
                //localStorage.setItem( "password", c_str_password );
                localStorage.setItem( "passphrase", c_str_passphrase );
                localStorage.setItem( "decrypt", l_str_decryptPassPhrase );
                localStorage.setItem( "session", true );

                /* Session Storage */
                //sessionStorage.setItem( "username", c_str_username );
                //sessionStorage.setItem( "password", c_str_password );
                sessionStorage.setItem( "passphrase", c_str_passphrase );
                sessionStorage.setItem( "decrypt", l_str_decryptPassPhrase );
                sessionStorage.setItem( "session", true );

                /* Cookies */
                //document.cookie = "passphrase=" + c_str_passphrase +
                //                  "; expires=" + new Date( 9999, 0, 1 )
                //                  .toUTCString()

                /* Welcome Alert */
                alert( "Login Success!\nWelcome " + l_obj_data.accounts[i].name );
                
                return l_str_decryptPassPhrase;

            }

        }

    }

    return "Wrong Username/Password!"

}

/******************************************************************************/
/*  Function:                                                                 */
/*      fs_f_authAPI                                                          */
/*  Outline:                                                                  */
/*      Authentication for Access The API                                     */
/*  Parameter:                                                                */
/*      None                                                                  */
/*  Return Value:                                                             */
/*      Calling API function or calling alert function                        */
/*  Function Explanation:                                                     */
/*      Authentication for Access The API                                     */
/*  Note:                                                                     */
/*      None                                                                  */
/*  Traceability Reference ID:                                                */
/*      [REF #Zulma-JSA-1_3#];<WOILU-JSA-1_3>                                 */
/******************************************************************************/
function fs_f_authAPI() {

    /* Get Passphrase from input Form */
    const c_str_passphrase = c_obj_inputPassphrase.value;

    //let l_str_encryptedPassPhrase = CryptoJS.AES.encrypt( JSON.stringify( "text" ),
    //                                c_str_passphrase )
    //                                .toString(); //USING TO CREATING ENCRYPT DATA
    //l_str_encryptedPassPhrase = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse( l_str_encryptedPassPhrase ));
    //alert(l_str_encryptedPassPhrase); //GET THE STRING DATA

    /* Checking Paraphrase Data One By One with For Looping */
    for ( i of c_list_passPhraseList ) {

        /* IF passphrase decrypt to string same with empty string, continue the program */
        if ( CryptoJS.AES.decrypt( i, c_str_passphrase.toLowerCase() )
             .toString( CryptoJS.enc.Utf8 ) === "" ) {

            continue; /* Continue Program & back to Looping if list have a data after it */

        } else {

            /* IF passphrase decrypt has data to be returned this program will running */
            /* Decrypt Paraphrase & put in a variable to be a parameter */
            let l_str_apiURL = CryptoJS.AES.decrypt( i, c_str_passphrase.toLowerCase() )
                               .toString( CryptoJS.enc.Utf8 );

            /* Calling fs_readAPI function and send data API URL as a Parameter on return */
            return fs_readAPI( l_str_apiURL );

        }

    }

    return alert( "Wrong Password Phrase!" ) /* Return this if Data wasn't found on the list */

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
    s_str_decryptLink = sessionStorage.getItem( "decrypt" ) === null ?   /* Decrypt Link   */
                       localStorage.getItem( "decrypt" )             :
                       sessionStorage.getItem( "decrypt" );

    /* For Local Storage */
    s_tf_sessionStatus = s_tf_sessionStatus === null ? false : s_tf_sessionStatus; /* Session Status */
    s_str_passphrase = s_str_passphrase === null ? "" : s_str_passphrase;          /* Passphrase     */
    s_str_decryptLink = s_str_decryptLink === null ? "" : s_str_decryptLink;       /* Decrypt Link   */

}

/******************************************************************************/
/*        TOGGLE FUNCTION                                                     */
/******************************************************************************/

/******************************************************************************/
/*                                                                            */
/*  Function : ENTER TOGGLE FUNCTION FOR USERNAME                             */
/*                                                                            */
/*  Input    : EVENT CODE                                                     */
/*                                                                            */
/*  Output   : PASSWORD BOX FOCUS | DELETE INPUT                              */
/*                                                                            */
/******************************************************************************/
c_obj_inputUsername.addEventListener( "keyup", function( event ) {

    /* Press Enter, User Will Activate this Condition */
    if ( ( event.code === "Enter"       )     /* Event Code Enter            */
      || ( event.code === "NumpadEnter" )     /* Event Code NumpadEnter      */
      || ( event.keyCode === 13         )     /* Event Code Enter For Mobile */
      || ( event.which === 13           )     /* Event Code Enter For Mobile */
      || ( event.code === "ArrowDown"   ) ) { /* Event Code for Arrow Down   */

        c_obj_inputPassword.focus(); /* Go to the Next Input Box */

    /* Press Esc & Delete, User Will Activate this Condition */
    } else if ( ( event.code === "Escape"   )     /* Event Code Escape */
             || ( event.code === "Esc"      )     /* Event Code Esc    */
             || ( event.code === "Delete"   ) ) { /* Event Code Delete */

        c_obj_inputUsername.value = ""; /* Clear the Input Box */

    /* IF event code wasn't response, Running this program */
    } else {

        /* Do Nothing */

    }

} );

/******************************************************************************/
/*                                                                            */
/*  Function : ENTER TOGGLE FUNCTION FOR PASSWORD                             */
/*                                                                            */
/*  Input    : EVENT CODE                                                     */
/*                                                                            */
/*  Output   : USERNAME BOX FOCUS | PASSPHRASE BOX FOCUS | DELETE INPUT       */
/*                                                                            */
/******************************************************************************/
c_obj_inputPassword.addEventListener( "keyup", function( event ) {

    /* Press Enter, User Will Activate this Condition */
    if ( ( event.code === "Enter"       )     /* Event Code Enter            */
      || ( event.code === "NumpadEnter" )     /* Event Code NumpadEnter      */
      || ( event.keyCode === 13         )     /* Event Code Enter For Mobile */
      || ( event.which === 13           )     /* Event Code Enter For Mobile */
      || ( event.code === "ArrowDown"   ) ) { /* Event Code for Arrow Down   */

        c_obj_inputPassphrase.focus(); /* Go to the Next Input Box */

    /* Back Focus to Password */
    } else if ( event.code === "ArrowUp" ) {

        c_obj_inputUsername.focus();

    /* Press Esc & Delete, User Will Activate this Condition */
    } else if ( ( event.code === "Escape"   )     /* Event Code Escape */
             || ( event.code === "Esc"      )     /* Event Code Esc    */
             || ( event.code === "Delete"   ) ) { /* Event Code Delete */

        c_obj_inputPassword.value = ""; /* Clear the Input Box */

    /* IF event code wasn't response, Running this program */
    } else {

        /* Do Nothing */

    }

} );

/******************************************************************************/
/*                                                                            */
/*  Function : ENTER TOGGLE FUNCTION FOR PASSPHRASE                           */
/*                                                                            */
/*  Input    : EVENT CODE                                                     */
/*                                                                            */
/*  Output   : PASSWORD BOX FOCUS | fs_f_authAPI | DELETE INPUT               */
/*                                                                            */
/******************************************************************************/
c_obj_inputPassphrase.addEventListener( "keyup", function( event ) {

    /* Press Enter, User Will Activate this Condition */
    if ( ( event.code === "Enter"       )     /* Event Code Enter            */
      || ( event.code === "NumpadEnter" )     /* Event Code NumpadEnter      */
      || ( event.keyCode === 13         )     /* Event Code Enter For Mobile */
      || ( event.which === 13           ) ) { /* Event Code Enter For Mobile */

        fs_f_authAPI(); /* Call fs_f_authAPI */

    /* Back Focus to Password */
    } else if ( event.code === "ArrowUp" ) {

        c_obj_inputPassword.focus();

    /* Press Esc & Delete, User Will Activate this Condition */
    } else if ( ( event.code === "Escape"   )     /* Event Code Escape */
             || ( event.code === "Esc"      )     /* Event Code Esc    */
             || ( event.code === "Delete"   ) ) { /* Event Code Delete */

        c_obj_inputPassphrase.value = ""; /* Clear the Input Box */

    /* IF event code wasn't response, Running this program */
    } else {

        /* Do Nothing */

    }

} );

/******************************************************************************/
/*                                                                            */
/*  Function : WINDOW ONLOAD FUNCTION                                         */
/*                                                                            */
/*  Input    : LOAD                                                           */
/*                                                                            */
/*  Output   : SHOWING LOGIN PAGE | REDIRECT TO SHORTLINK PAGE                */
/*                                                                            */
/******************************************************************************/
window.addEventListener( "load", ( event ) => {

    fs_initSession(); // Initialize the Session

    if ( ( s_tf_sessionStatus       )     /* If Session was True           */
      && ( s_str_passphrase !== ""  )     /* Passphrase have a value       */
      && ( s_str_decryptLink !== "" ) ) { /* and Decrypt Link have a value */

        window.location.replace( s_str_decryptLink ); /* Go to Shortlink Page */

    } else {

        /* Do Nothing */

    }

} );

/******** END OF FILE *********************************************************/
