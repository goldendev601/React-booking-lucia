import React from "react";
import {colors} from "styles/colors";
import {StyledButton} from "@core/components";

const ViewLessButton = ({handleExpandClick, expanded}) => {
    return (
        <StyledButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            $color={colors.brand}
            $borderbottom="2px solid rgba(192, 167, 152, .2)"
            style={{margin: '20px 0 70px 0'}}
        >
            View less
        </StyledButton>
    );
}

export default ViewLessButton;