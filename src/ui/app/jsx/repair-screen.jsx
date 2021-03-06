//
//  Copyright 2017-2019 The Last Pickle Ltd
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

import React from "react";
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from "moment";
import ServerStatus from "jsx/server-status";
import Sidebar from "jsx/sidebar";
import RepairForm from "jsx/repair-form";
import RepairList from "jsx/repair-list";
import NavBar from "jsx/navbar";
import {RowDeleteMixin, RowAbortMixin, StatusUpdateMixin, DeleteStatusMessageMixin, CFsListRender} from "jsx/mixin";

const repairScreen = CreateReactClass({
  mixins: [RowDeleteMixin, StatusUpdateMixin, RowAbortMixin],

  propTypes: {
    currentCluster: PropTypes.string.isRequired,
    addRepairSubject: PropTypes.object.isRequired,
    addRepairResult: PropTypes.object.isRequired,
    clusterNames: PropTypes.object.isRequired,
    deleteSubject: PropTypes.object.isRequired,
    deleteResult: PropTypes.object.isRequired,
    updateStatusSubject: PropTypes.object.isRequired,
    updateIntensitySubject: PropTypes.object.isRequired,
    repairs: PropTypes.object.isRequired,
    statusObservableTimer: PropTypes.object.isRequired,
    repairRunResult: PropTypes.object.isRequired,
    repairRunSubject: PropTypes.object.isRequired,
    switchTheme: PropTypes.func
  },

  getInitialState: function() {
    return {currentCluster:this.props.currentCluster=="undefined"?"all":this.props.currentCluster};
  },

  changeCurrentCluster : function(clusterName){
    this.setState({currentCluster: clusterName});
  },

  render: function() {

    const navStyle = {
      marginBottom: 0
    };

    return (
    <div id="wrapper">
        <nav className="navbar navbar-inverse navbar-static-top" role="navigation" style={navStyle}>
            <NavBar switchTheme={this.props.switchTheme}></NavBar>

            <Sidebar clusterNames={this.props.clusterNames} currentCluster={this.state.currentCluster}
              logoutSubject={this.props.logoutSubject} logoutResult={this.props.logoutResult}> </Sidebar>
        </nav>

        <div id="page-wrapper">
            <div className="row">
                <ServerStatus statusObservableTimer={this.props.statusObservableTimer}></ServerStatus>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Repair</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                  <RepairForm addRepairSubject={this.props.addRepairSubject} addRepairResult={this.props.addRepairResult} clusterNames={this.props.clusterNames} currentCluster={this.props.currentCluster} formType="repair"> </RepairForm>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-12">
                  <RepairList repairs={this.props.repairs}
                              clusterNames={this.props.clusterNames}
                              deleteSubject={this.props.deleteSubject}
                              deleteResult={this.props.deleteResult}
                              updateStatusSubject={this.props.updateStatusSubject}
                              updateIntensitySubject={this.props.updateIntensitySubject}
                              currentCluster={this.state.currentCluster}
                              changeCurrentCluster={this.changeCurrentCluster}
                              repairRunSubject={this.props.repairRunSubject}
                              repairRunResult={this.props.repairRunResult}> </RepairList>
                </div>
            </div>

        </div>
    </div>
    );
  }

});



export default repairScreen;
