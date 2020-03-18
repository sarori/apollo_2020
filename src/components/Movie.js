import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
	mutation toggleLikeMovie($id: String!, $isLiked: Boolean!) {
		toggleLikeMovie(id: $id, isLiked: $isLiked) @client
	}
`;

const Container = styled.div`
	height: 420px;
	width: 100%;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	border-radius: 7px;
`;
// overflow: hidden;

const Poster = styled.div`
	overflow: hidden;
	background-image: url(${props => props.bg});
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center center;
`;

export default ({ id, bg, isLiked }) => {
	console.log(bg);
	const [toggleMovie] = useMutation(LIKE_MOVIE, {
		variables: { id: id, isLiked }
	});
	return (
		<Container>
			<Link to={`/${id}`}>
				<Poster bg={bg} />
			</Link>
			<button onClick={toggleMovie}>{isLiked ? "Unlike" : "Like"}</button>
		</Container>
	);
};
