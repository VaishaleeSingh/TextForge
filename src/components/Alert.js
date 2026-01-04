import React from "react";

export default function Alert(props) {
    const theme = props.theme || { success: '#198754', danger: '#dc3545', warning: '#ffc107', info: '#0dcaf0', text: '#042743', background: 'white' };
    
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    const getAlertColor = (type) => {
        switch(type) {
            case 'success': return theme.success;
            case 'danger': return theme.danger;
            case 'warning': return theme.warning;
            case 'info': return theme.info;
            default: return theme.success;
        }
    }

    const alertStyle = {
        backgroundColor: getAlertColor(props.alert?.type) + '20',
        border: `1px solid ${getAlertColor(props.alert?.type)}`,
        color: theme.text,
        borderRadius: '8px',
        padding: '12px 16px',
        margin: '10px 0',
        transition: 'all 0.3s ease'
    };

  return (
   props.alert && <div style={{padding: '0 15px'}}>
      <div
        className="alert alert-dismissible fade show"
        role="alert"
        style={alertStyle}
      >
        <strong style={{color: getAlertColor(props.alert.type)}}>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
      </div>
    </div>
  );
}
