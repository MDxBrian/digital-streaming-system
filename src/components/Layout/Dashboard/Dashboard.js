
import React, { useState } from 'react';
import Loader from "../../Loader/Loader";
import Header from "../Header/header";
import QCPersonnelPage from '../../../page/QCPersonnel/HomePage/Home';
import AccountSettingPage from '../../../page/QCPersonnel/AccountSettingPage/accountSettingPage';
import UnderwriterHomePage from '../../../page/Underwriter/underWriterHomePage'
import QCManagerHomePage from '../../../page/QCManager/qcManagerHomePage';
import QCManagerUserManagement from "../../../page/QCManager/UserManagement/UserManagement"
import PageNotFound from '../../../page/PageNotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DirectRoute from '../../../directRoute';
import SideMenu from "../sideMenu";
import { Layout, Row, Col } from 'antd';
import "./Dashboard.css";
const { Content } = Layout;

const Dashboard = () => {
  const [subRole, setSubRole] = useState("")
  const [eligbleChangeRole, setEligbleChangeRole] = useState()
  return (
    <Loader>
      <Router>
        <Layout style={{ minHeight: "100vh" }} className="site-layout">
          <Header setSubRole={setSubRole} eligbleChangeRole={eligbleChangeRole} usersSubRole={subRole} />
          <Layout >
            <SideMenu setSubRole={setSubRole} />
            <Content style={{ background: '#f0f2f5', margin: '80px 16px 250px 315px', padding: 24 }} >
              <div className="site-layout-background" style={{ minHeight: 360 }}>
                <Row>
                  <Col>
                    <Routes>
                      <Route exact path="/" element={<DirectRoute subRole={subRole} />} />
                      <Route path="qcissuance/home" element={<QCPersonnelPage subrole={1} setEligbleChangeRole={setEligbleChangeRole} />} />
                      <Route path="qcmanager/usermanagement" element={<QCManagerUserManagement />} />
                      <Route path="qcissuance/accountsetting" element={<AccountSettingPage />} />
                      <Route path="qcreleasing/home" element={<QCPersonnelPage subrole={2} setEligbleChangeRole={setEligbleChangeRole} />} />
                      <Route path="underwriter/home" element={<UnderwriterHomePage />} />
                      <Route path="qcmanager/home" element={<QCManagerHomePage />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </Loader>
  );

};


export default Dashboard;




