import React from 'react';
import ContentLoader from 'react-content-loader';
import { Spinner } from 'react-bootstrap';

// const Loader = (props) => (
//     <ContentLoader viewBox="0 0 340 84" {...props}>
//         <rect x="0" y="0" width="67" height="11" rx="3" />
//         <rect x="76" y="0" width="140" height="11" rx="3" />
//         <rect x="127" y="48" width="53" height="11" rx="3" />
//         <rect x="187" y="48" width="72" height="11" rx="3" />
//         <rect x="18" y="48" width="100" height="11" rx="3" />
//         <rect x="0" y="71" width="37" height="11" rx="3" />
//         <rect x="18" y="23" width="140" height="11" rx="3" />
//         <rect x="166" y="23" width="173" height="11" rx="3" />
//     </ContentLoader>
// );

const Loader = () => {
    return (
        <>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="dark" />
        </>
    );
};

export default Loader;
