import React from "react";
import {colors} from "styles/colors";
import {StyledButton} from "@core/components";

const ViewMoreButton = ({handleExpandClick, expanded}) => {
    return (
        <StyledButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            $color={colors.brand}
            $borderbottom="2px solid rgba(192, 167, 152, .2)"
            style={{marginBottom: !expanded ? '70px' : '0', display: expanded ? 'none' : null}}
        >
            {!expanded ? 'View more' : 'View less'}
        </StyledButton>
    );
}

export default ViewMoreButton;