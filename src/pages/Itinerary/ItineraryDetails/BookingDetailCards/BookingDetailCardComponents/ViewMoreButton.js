import React from "react";
import {colors} from "styles/colors";
import {StyledButton} from "@core/components";

const ViewMoreButton = ({handleExpandClick, expanded}) => {
    return (
        <StyledButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            $borderbottom
            $color={colors.black1}
            $fontWeight="normal"
            $fontsize="14px"
            style={{display: expanded ? 'none' : null}}
        >
            View more
        </StyledButton>
    );
}

export default ViewMoreButton;