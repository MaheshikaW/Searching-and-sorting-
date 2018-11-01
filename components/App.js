import React, { Component } from 'react';
import Search from './Search';
import Pagination from './Pagination';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentrecord: [],
            currentPage: 1,
            recordsPerPage: '',
            pageNumbersPerPage: 5,
            term: '',
            year: '',
            district: '',
            sortValue: '',
            clickTime: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePages = this.handlePages.bind(this);
        this.handlePagesLess = this.handlePagesLess.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.searchYearHandler = this.searchYearHandler.bind(this);
        this.searchDistrictHandler = this.searchDistrictHandler.bind(this);
        this.sortByClassSize = this.sortByClassSize.bind(this);
        this.sortBySchool = this.sortBySchool.bind(this);
        this.sortBySchoolYear = this.sortBySchoolYear.bind(this);
        this.sortByDistrict = this.sortByDistrict.bind(this);
        this.sortByDemographic = this.sortByDemographic.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)

        });
    }
    handlePages() {
        let currentpages = this.state.pageNumbersPerPage
        this.setState({
            pageNumbersPerPage: currentpages - 2

        })
    }
    handlePagesLess() {
        let currentpages = this.state.pageNumbersPerPage
        this.setState({
            pageNumbersPerPage: currentpages + 2

        })
    }

    componentDidMount() {
        fetch('https://data.delaware.gov/resource/ncv7-2w22.json')
            .then(result => {
                return result.json();
            })
            .then(json => {

                this.setState({
                    isLoaded: true,
                    studentrecord: json,
                    recordsPerPage: 30
                })
            })
    }

    searchHandler(e) {

        this.setState({
            term: e.target.value,

        })
    }

    searchYearHandler(e) {

        this.setState({
            year: e.target.value,

        })
    }

    searchDistrictHandler(e) {

        this.setState({
            district: e.target.value,

        })
    }

    sortByClassSize() {

        this.setState({
            sortValue: 'classsize',
            clickTime: this.state.clickTime + 1

        })
    }

    sortBySchool() {

        this.setState({
            sortValue: 'schoolname',
            clickTime: this.state.clickTime + 1
        })
    }

    sortBySchoolYear() {

        this.setState({
            sortValue: 'schoolyear',
            clickTime: this.state.clickTime + 1

        })
    }

    sortByDistrict() {

        this.setState({
            sortValue: 'districtname',
            clickTime: this.state.clickTime + 1


        })
    }
    sortByDemographic() {

        this.setState({
            sortValue: "demographic",
            clickTime: this.state.clickTime + 1
        })
    }

    render() {
        var { studentrecord, currentPage, recordsPerPage } = this.state;
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentrecords = studentrecord.slice(indexOfFirstRecord, indexOfLastRecord);

        const stylea = {
            padding: 8,
            cursor: 'pointer'
        }
        
        const styleHead = {
            color: 'blue',
            padding: 10,
            fontWeight: 'bold'
        }

        let data;
        let filterlist = [];




        if (this.state.term !== '') {

            filterlist = studentrecord.filter(student =>
                student.schoolname === this.state.term || student.schoolname.toLowerCase().includes(this.state.term))

            data = <div>{filterlist.slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-3" >{student["schoolname"]}</div>
                    <div className="col-md-1" >{student["schoolyear"]}</div>&nbsp;
                              <div className="col-md-3" >{student["districtname"]}</div>
                    <div className="col-md-3" >{student["demographic"]}</div>
                    <div className="col-md-1">{student["classsize"]}</div></div>
            )
            }</div>

            if (this.state.year !== '') {

                filterlist = filterlist.filter(student => student.schoolyear === this.state.year || student.schoolyear.toLowerCase().includes(this.state.year))

                data = <div>{filterlist.slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student["schoolname"]}</div>
                        <div className="col-md-1" >{student["schoolyear"]}</div>&nbsp;
                              <div className="col-md-3" >{student["districtname"]}</div>
                        <div className="col-md-3" >{student["demographic"]}</div>
                        <div className="col-md-1">{student["classsize"]}</div></div>
                )
                }</div>
            }


            if (this.state.district !== '') {
                filterlist = filterlist.filter(student =>
                    student.districtname === this.state.district || student.districtname.toLowerCase().
                        includes(this.state.district))

                data = <div >{filterlist.slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                  <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1" >{student.classsize}</div></div>
                )
                }</div>
            }

            if (this.state.sortValue !== '') {
                data = <div >{filterlist.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                    if (a[this.state.sortValue] < b[this.state.sortValue]) { return -1; }
                    if (a[this.state.sortValue] > b[this.state.sortValue]) { return 1; }
                    return 0;

                }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1">{student.classsize}</div></div>
                )
                }</div>

                if ((this.state.clickTime) % 2 == 0) {
                    data = <div >{filterlist.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                        if (a[this.state.sortValue] > b[this.state.sortValue]) { return -1; }
                        if (a[this.state.sortValue] < b[this.state.sortValue]) { return 1; }
                        return 0;

                    }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                          <div className="col-md-3">{student.districtname}</div>
                            <div className="col-md-3" >{student.demographic}</div>
                            <div className="col-md-1">{student.classsize}</div></div>
                    )
                    }</div>

                }

            }

        }
        else if (this.state.year != '') {
            filterlist = studentrecord.filter(student =>
                student.schoolyear === this.state.year || student.schoolyear.
                    includes(this.state.year))

            data = <div >{filterlist.slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                    <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                    <div className="col-md-3">{student.demographic}</div>
                    <div className="col-md-1" >{student.classsize}</div></div>
            )
            }</div>


            if (this.state.sortValue !== '') {
                data = <div >{filterlist.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                    if (a[this.state.sortValue] < b[this.state.sortValue]) { return -1; }
                    if (a[this.state.sortValue] > b[this.state.sortValue]) { return 1; }
                    return 0;

                }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                      <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1">{student.classsize}</div></div>
                )
                }</div>

                if ((this.state.clickTime) % 2 == 0) {
                    data = <div >{filterlist.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                        if (a[this.state.sortValue] > b[this.state.sortValue]) { return -1; }
                        if (a[this.state.sortValue] < b[this.state.sortValue]) { return 1; }
                        return 0;

                    }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                          <div className="col-md-3">{student.districtname}</div>
                            <div className="col-md-3" >{student.demographic}</div>
                            <div className="col-md-1">{student.classsize}</div></div>
                    )
                    }</div>

                }
            }
        }
        else if (this.state.district !== '') {
            filterlist = studentrecord.filter(student =>
                student.districtname === this.state.district || student.districtname.toLowerCase().
                    includes(this.state.district))

            data = <div >{filterlist.slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                    <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-3" >{student.demographic}</div>
                    <div className="col-md-1" >{student.classsize}</div></div>
            )
            }</div>

            if (this.state.sortValue !== '') {
                data = <div >{filterlist.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                    if (a[this.state.sortValue] < b[this.state.sortValue]) { return -1; }
                    if (a[this.state.sortValue] > b[this.state.sortValue]) { return 1; }
                    return 0;

                }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                          <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1">{student.classsize}</div></div>
                )
                }</div>
                if ((this.state.clickTime) % 2 == 0) {
                    data = <div >{filterlist.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                        if (a[this.state.sortValue] > b[this.state.sortValue]) { return -1; }
                        if (a[this.state.sortValue] < b[this.state.sortValue]) { return 1; }
                        return 0;

                    }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                          <div className="col-md-3">{student.districtname}</div>
                            <div className="col-md-3" >{student.demographic}</div>
                            <div className="col-md-1">{student.classsize}</div></div>
                    )
                    }</div>
                }
            }
        }



        else if (this.state.sortValue !== '' && this.state.sortValue !== 'classsize') {
            data = <div >{studentrecord.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                if (a[this.state.sortValue] < b[this.state.sortValue]) { return -1; }
                if (a[this.state.sortValue] > b[this.state.sortValue]) { return 1; }
                return 0;

            }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                    <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-3" >{student.demographic}</div>
                    <div className="col-md-1">{student.classsize}</div></div>
            )
            }</div>
            if ((this.state.clickTime) % 2 == 0) {
                data = <div >{studentrecord.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                    if (a[this.state.sortValue] > b[this.state.sortValue]) { return -1; }
                    if (a[this.state.sortValue] < b[this.state.sortValue]) { return 1; }
                    return 0;

                }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                  <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1">{student.classsize}</div></div>
                )
                }</div>
            }
        }
        else if (this.state.sortValue == 'classsize') {
            data = <div >{studentrecord.filter(student => student[this.state.sortValue] != null).sort((a, b) =>
                a[this.state.sortValue] - b[this.state.sortValue]).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1">{student.classsize}</div></div>
                )
            }</div>
            if ((this.state.clickTime) % 2 == 0) {
                data = <div>{studentrecord.filter(student => student[this.state.sortValue] != null).sort((a, b) =>
                    b[this.state.sortValue] - a[this.state.sortValue]).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-3" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                  <div className="col-md-3">{student.districtname}</div>
                            <div className="col-md-3" >{student.demographic}</div>
                            <div className="col-md-1">{student.classsize}</div></div>
                    )
                }</div>
            }
        }

        else {
            data = <div >{currentrecords.map((student, index) =>
                <div key={index}><div className="col-md-3"  >{student["schoolname"]}</div>
                    <div className="col-md-1">{student["schoolyear"]}</div>&nbsp;
                              <div className="col-md-3" >{student["districtname"]}</div>
                    <div className="col-md-3" >{student["demographic"]}</div>
                    <div className="col-md-1" >{student["classsize"]}</div></div>
            )
            }</div>

            filterlist = studentrecord
        }
    console.log(filterlist.length)
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filterlist.length / recordsPerPage); i++) {
            pageNumbers.push(i);
        }

        const nmub = [];
        for (let i = 1; i <= Math.ceil(pageNumbers.length / this.state.pageNumbersPerPage); i++) {
            nmub.push(i);
        }

        const renderPageNumbers = nmub.map(number => {
            return (
                <a style={stylea}
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </a>
            );
        });


        return (
            <div>
                <Search term={this.state.term} year={this.state.year} district={this.state.district}
                    searchHandler={this.searchHandler} searchYearHandler={this.searchYearHandler}
                    searchDistrictHandler={this.searchDistrictHandler} />

                <div style={styleHead} className="row">
                    <div className="col-md-3" style={styleHead} >&nbsp;&nbsp;<a onClick={this.sortBySchool} style={stylea}>School Name</a></div>
                    <div className="col-md-1" style={styleHead}><a onClick={this.sortBySchoolYear} style={stylea}>School Year</a></div>
                    <div className="col-md-3" style={styleHead}><a onClick={this.sortByDistrict} style={stylea}>District</a></div>
                    <div className="col-md-3" style={styleHead}><a onClick={this.sortByDemographic} style={stylea}>Demographic</a></div>
                    <div className="col-md-1" style={styleHead}><a onClick={this.sortByClassSize} style={stylea}>class Size</a></div>
                </div>
                {data}
               <Pagination  renderPageNumbers={renderPageNumbers} handlePagesLess={this.handlePagesLess} 
               handlePages={this.handlePages}/></div>
        );
    }
}


export default App;