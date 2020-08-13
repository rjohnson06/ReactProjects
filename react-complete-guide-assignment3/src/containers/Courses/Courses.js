import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';

import './Courses.css';
import Course from '../Course/Course';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return <article className="Course" key={course.id}>{course.title} <Link to={"/courses/" + course.id}>Go to course</Link></article>;
                        } )
                    }
                </section>
                <Route path="/courses/:id"
                  render={routeProps => {
                    const props = {...routeProps};
                    props.title = this.state.courses.find(element => element.id === parseInt(routeProps.match.params.id)).title;
                    props.id = routeProps.match.params.id;
                    return <Course {...props } ></Course>
                  } }>
                </Route>
            </div>
        );
    }
}

export default Courses;
