import React from 'react';

class HomePage extends React.Component {
  componentDidMount() {
    var oauth = require('oauth-sign');
    var action = 'LTI_ENDPOINT';
    var method = 'POST';
    var timestamp = Math.round(Date.now() / 1000);
    var params = {
        lti_message_type: 'basic-lti-launch-request',
        lti_version: 'LTI-1p0',
        resource_link_id: 'RESOURCE_LINK_ID',
        
        oauth_consumer_key: 'CONSUMER_KEY',
        oauth_nonce: btoa(timestamp),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: timestamp,
        oauth_version: '1.0'
    };
    var signature = oauth.hmacsign(method, action, params, 'SECRET_KEY');
    params.oauth_signature = signature;
    var form = document.querySelector("#ltiForm");
    form.action = action;
    form.method = method;
    for (var name in params) {
        var node = document.createElement("input");
        node.name = name;
        node.type = 'hidden';
        node.value = params[name];
        form.appendChild(node);
    }
    var output = document.querySelector("#code");
    output.textContent = JSON.stringify(params, null, 2);
    console.log(form);
    var meta = document.querySelector("body > script");
    console.log(meta);
  }
  
  render() {
    return (
      <>
        <p id='code' />
        <br />
        <form id="ltiForm" method="POST">
          <input type='submit' />
        </form>
    </>
    )
    }
};

HomePage.propTypes = {};

export default HomePage;
