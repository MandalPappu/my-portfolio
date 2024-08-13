import * as React from "react";

interface EmailTemplateProps {
    visitorName: string;
    visitorEmail: string;
    visitorMessage: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
   visitorName,
    visitorEmail,
    visitorMessage
}) => (
    <div>
        <h1>Name: {visitorName}</h1>
        <h1>Email: {visitorEmail }</h1>
        <p>message: { visitorMessage }</p>
  </div>
);
