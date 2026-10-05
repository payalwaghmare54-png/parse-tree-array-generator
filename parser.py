class ParseTreeNode:
    def __init__(self, symbol, children=None):
        self.symbol = symbol
        self.children = children if children else []

    def to_dict(self):
        return {
            "symbol": self.symbol,
            "children": [child.to_dict() for child in self.children]
        }


def parse_string(string):
    """
    Grammar:
        S -> aSb
        S -> ab

    This grammar generates:
        ab
        aabb
        aaabbb
        aaaabbbb
        ...
    """

    def parse_S(s, start, end):

        # Rule: S -> ab
        if end - start == 2:
            if s[start] == 'a' and s[start + 1] == 'b':
                return ParseTreeNode(
                    "S",
                    [
                        ParseTreeNode("a"),
                        ParseTreeNode("b")
                    ]
                )

        # Rule: S -> aSb
        if end - start >= 4:
            if s[start] == 'a' and s[end - 1] == 'b':

                child = parse_S(s, start + 1, end - 1)

                if child:
                    return ParseTreeNode(
                        "S",
                        [
                            ParseTreeNode("a"),
                            child,
                            ParseTreeNode("b")
                        ]
                    )

        return None

    if not string:
        return None

    return parse_S(string, 0, len(string))