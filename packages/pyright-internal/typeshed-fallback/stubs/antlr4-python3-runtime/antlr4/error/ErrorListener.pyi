from _typeshed import Incomplete

class ErrorListener:
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e) -> None: ...
    def reportAmbiguity(self, recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) -> None: ...
    def reportAttemptingFullContext(self, recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) -> None: ...
    def reportContextSensitivity(self, recognizer, dfa, startIndex, stopIndex, prediction, configs) -> None: ...

class ConsoleErrorListener(ErrorListener):
    INSTANCE: Incomplete
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e) -> None: ...

class ProxyErrorListener(ErrorListener):
    delegates: Incomplete
    def __init__(self, delegates) -> None: ...
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e) -> None: ...
    def reportAmbiguity(self, recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) -> None: ...
    def reportAttemptingFullContext(self, recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) -> None: ...
    def reportContextSensitivity(self, recognizer, dfa, startIndex, stopIndex, prediction, configs) -> None: ...