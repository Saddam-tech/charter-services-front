import { IBlogs } from 'components/ServicesBlog'
import React from 'react'
import styled from 'styled-components'

const ServicesDropdown = ({ h1, arr, img }: IBlogs) => {
    return (
        <Container img={img}>
            <div className="backdrop"></div>
            <ul className="options-wrap">
                <h3>{h1}</h3>
                {arr?.map((el, i) => (
                    <li className="list" key={i}>{el}</li>
                ))}
            </ul>
        </Container>
    )
}

export default ServicesDropdown

const Container = styled.section<{ img: string }>`
    background-image: ${({ img }) => `url(${require('assets/' + img)})`};
    background-position: center;
    display: flex;
    align-items:flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    max-width: 180px;
    height: 400px;
    border-radius: 20px;
    overflow: hidden;

    .backdrop {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    .options-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
        gap: 10px;
        height: 100%;
        padding: 0;
        margin: 10px;
        z-index: 2;
        h3 {
            color: #ffffff;
            font-size: 21px;
        }
        .list {
            list-style-type: none;
            height: unset;
        }
        .list:hover {
            color: #c69536
        }
    }
`;